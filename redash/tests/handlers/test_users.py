from redash import models
from tests import BaseTestCase
from mock import patch


class TestUserListResourcePost(BaseTestCase):
    def test_returns_403_for_non_admin(self):
        rv = self.make_request('post', "/api/users")
        self.assertEqual(rv.status_code, 403)

    def test_returns_400_when_missing_fields(self):
        admin = self.factory.create_admin()

        rv = self.make_request('post', "/api/users", user=admin)
        self.assertEqual(rv.status_code, 400)

        rv = self.make_request('post', '/api/users', data={'name': 'User'}, user=admin)
        self.assertEqual(rv.status_code, 400)
    
    def test_returns_400_when_using_temporary_email(self):
        admin = self.factory.create_admin()

        test_user = {'name': 'User', 'email': 'user@mailinator.com', 'password': 'test'}
        rv = self.make_request('post', '/api/users', data=test_user, user=admin)
        self.assertEqual(rv.status_code, 400)

        test_user['email'] = 'arik@qq.com'
        rv = self.make_request('post', '/api/users', data=test_user, user=admin)
        self.assertEqual(rv.status_code, 400)


    def test_creates_user(self):
        admin = self.factory.create_admin()

        test_user = {'name': 'User', 'email': 'user@example.com', 'password': 'test'}
        rv = self.make_request('post', '/api/users', data=test_user, user=admin)

        self.assertEqual(rv.status_code, 200)
        self.assertEqual(rv.json['name'], test_user['name'])
        self.assertEqual(rv.json['email'], test_user['email'])

    def test_creates_user_case_insensitive_email(self):
        admin = self.factory.create_admin()

        test_user = {'name': 'User', 'email': 'User@Example.com', 'password': 'test'}
        rv = self.make_request('post', '/api/users', data=test_user, user=admin)

        self.assertEqual(rv.status_code, 200)
        self.assertEqual(rv.json['name'], test_user['name'])
        self.assertEqual(rv.json['email'], 'user@example.com')

    def test_returns_400_when_email_taken(self):
        admin = self.factory.create_admin()

        test_user = {'name': 'User', 'email': admin.email, 'password': 'test'}
        rv = self.make_request('post', '/api/users', data=test_user, user=admin)

        self.assertEqual(rv.status_code, 400)

    def test_returns_400_when_email_taken_case_insensitive(self):
        admin = self.factory.create_admin()

        test_user1 = {'name': 'User', 'email': 'user@example.com', 'password': 'test'}
        rv = self.make_request('post', '/api/users', data=test_user1, user=admin)

        self.assertEqual(rv.status_code, 200)
        self.assertEqual(rv.json['email'], 'user@example.com')

        test_user2 = {'name': 'User', 'email': 'user@Example.com', 'password': 'test'}
        rv = self.make_request('post', '/api/users', data=test_user2, user=admin)

        self.assertEqual(rv.status_code, 400)


class TestUserListGet(BaseTestCase):
    def test_returns_users_for_given_org_only(self):
        user1 = self.factory.user
        user2 = self.factory.create_user()
        org = self.factory.create_org()
        user3 = self.factory.create_user(org=org)

        rv = self.make_request('get', "/api/users")
        user_ids = map(lambda u: u['id'], rv.json['results'])
        self.assertIn(user1.id, user_ids)
        self.assertIn(user2.id, user_ids)
        self.assertNotIn(user3.id, user_ids)


class TestUserResourceGet(BaseTestCase):
    def test_returns_api_key_for_your_own_user(self):
        rv = self.make_request('get', "/api/users/{}".format(self.factory.user.id))
        self.assertIn('api_key', rv.json)

    def test_returns_api_key_for_other_user_when_admin(self):
        other_user = self.factory.user
        admin = self.factory.create_admin()

        rv = self.make_request('get', "/api/users/{}".format(other_user.id), user=admin)
        self.assertIn('api_key', rv.json)

    def test_doesnt_return_api_key_for_other_user(self):
        other_user = self.factory.create_user()

        rv = self.make_request('get', "/api/users/{}".format(other_user.id))
        self.assertNotIn('api_key', rv.json)

    def test_doesnt_return_user_from_different_org(self):
        org = self.factory.create_org()
        other_user = self.factory.create_user(org=org)

        rv = self.make_request('get', "/api/users/{}".format(other_user.id))
        self.assertEqual(rv.status_code, 404)


class TestUserResourcePost(BaseTestCase):
    def test_returns_403_for_non_admin_changing_not_his_own(self):
        other_user = self.factory.create_user()

        rv = self.make_request('post', "/api/users/{}".format(other_user.id), data={"name": "New Name"})
        self.assertEqual(rv.status_code, 403)

    def test_returns_200_for_non_admin_changing_his_own(self):
        rv = self.make_request('post', "/api/users/{}".format(self.factory.user.id), data={"name": "New Name"})
        self.assertEqual(rv.status_code, 200)

    def test_returns_200_for_admin_changing_other_user(self):
        admin = self.factory.create_admin()

        rv = self.make_request('post', "/api/users/{}".format(self.factory.user.id), data={"name": "New Name"}, user=admin)
        self.assertEqual(rv.status_code, 200)

    def test_fails_password_change_without_old_password(self):
        rv = self.make_request('post', "/api/users/{}".format(self.factory.user.id), data={"password": "new password"})
        self.assertEqual(rv.status_code, 403)

    def test_fails_password_change_with_incorrect_old_password(self):
        rv = self.make_request('post', "/api/users/{}".format(self.factory.user.id), data={"password": "new password", "old_password": "wrong"})
        self.assertEqual(rv.status_code, 403)

    def test_changes_password(self):
        new_password = "new password"
        old_password = "old password"

        self.factory.user.hash_password(old_password)
        models.db.session.add(self.factory.user)

        rv = self.make_request('post', "/api/users/{}".format(self.factory.user.id), data={"password": new_password, "old_password": old_password})
        self.assertEqual(rv.status_code, 200)

        user = models.User.query.get(self.factory.user.id)
        self.assertTrue(user.verify_password(new_password))
    
    def test_returns_400_when_using_temporary_email(self):
        admin = self.factory.create_admin()

        test_user = {'email': 'user@mailinator.com'}
        rv = self.make_request('post', '/api/users/{}'.format(self.factory.user.id), data=test_user, user=admin)
        self.assertEqual(rv.status_code, 400)

        test_user['email'] = 'arik@qq.com'
        rv = self.make_request('post', '/api/users', data=test_user, user=admin)
        self.assertEqual(rv.status_code, 400)


class TestUserDisable(BaseTestCase):
    def test_non_admin_cannot_disable_user(self):
        other_user = self.factory.create_user()
        self.assertFalse(other_user.is_disabled)

        rv = self.make_request('post', "/api/users/{}/disable".format(other_user.id), user=other_user)
        self.assertEqual(rv.status_code, 403)

        # user should stay enabled
        other_user = models.User.query.get(other_user.id)
        self.assertFalse(other_user.is_disabled)

    def test_admin_can_disable_user(self):
        admin_user = self.factory.create_admin()
        other_user = self.factory.create_user()
        self.assertFalse(other_user.is_disabled)

        rv = self.make_request('post', "/api/users/{}/disable".format(other_user.id), user=admin_user)
        self.assertEqual(rv.status_code, 200)

        # user should become disabled
        other_user = models.User.query.get(other_user.id)
        self.assertTrue(other_user.is_disabled)

    def test_admin_can_disable_another_admin(self):
        admin_user1 = self.factory.create_admin()
        admin_user2 = self.factory.create_admin()
        self.assertFalse(admin_user2.is_disabled)

        rv = self.make_request('post', "/api/users/{}/disable".format(admin_user2.id), user=admin_user1)
        self.assertEqual(rv.status_code, 200)

        # user should become disabled
        admin_user2 = models.User.query.get(admin_user2.id)
        self.assertTrue(admin_user2.is_disabled)

    def test_admin_cannot_disable_self(self):
        admin_user = self.factory.create_admin()
        self.assertFalse(admin_user.is_disabled)

        rv = self.make_request('post', "/api/users/{}/disable".format(admin_user.id), user=admin_user)
        self.assertEqual(rv.status_code, 400)

        # user should stay enabled
        admin_user = models.User.query.get(admin_user.id)
        self.assertFalse(admin_user.is_disabled)

    def test_admin_can_enable_user(self):
        admin_user = self.factory.create_admin()
        other_user = self.factory.create_user(disabled_at='2018-03-08 00:00')
        self.assertTrue(other_user.is_disabled)

        rv = self.make_request('delete', "/api/users/{}/disable".format(other_user.id), user=admin_user)
        self.assertEqual(rv.status_code, 200)

        # user should become enabled
        other_user = models.User.query.get(other_user.id)
        self.assertFalse(other_user.is_disabled)

    def test_admin_can_enable_another_admin(self):
        admin_user1 = self.factory.create_admin()
        admin_user2 = self.factory.create_admin(disabled_at='2018-03-08 00:00')
        self.assertTrue(admin_user2.is_disabled)

        rv = self.make_request('delete', "/api/users/{}/disable".format(admin_user2.id), user=admin_user1)
        self.assertEqual(rv.status_code, 200)

        # user should become enabled
        admin_user2 = models.User.query.get(admin_user2.id)
        self.assertFalse(admin_user2.is_disabled)

    def test_disabled_user_cannot_login(self):
        user = self.factory.create_user(disabled_at='2018-03-08 00:00')
        user.hash_password('password')

        self.db.session.add(user)
        self.db.session.commit()

        with patch('redash.handlers.authentication.login_user') as login_user_mock:
            rv = self.client.post('/login', data={'email': user.email, 'password': 'password'})
            # login handler should not be called
            login_user_mock.assert_not_called()
            # check for redirect back to login page
            self.assertEquals(rv.status_code, 301)
            self.assertIn('/login', rv.headers.get('Location', None))

    def test_disabled_user_should_not_access_api(self):
        # Note: some API does not require user, so check the one which requires

        # 1. create user; the user should have access to API
        user = self.factory.create_user()
        rv = self.make_request('get', '/api/dashboards', user=user)
        self.assertEquals(rv.status_code, 200)

        # 2. disable user; now API access should be forbidden
        user.disable()
        self.db.session.add(user)
        self.db.session.commit()

        rv = self.make_request('get', '/api/dashboards', user=user)
        self.assertNotEquals(rv.status_code, 200)

    def test_disabled_user_should_not_receive_restore_password_email(self):
        admin_user = self.factory.create_admin()

        # user should receive email
        user = self.factory.create_user()
        with patch('redash.handlers.users.send_password_reset_email') as send_password_reset_email_mock:
            send_password_reset_email_mock.return_value = 'reset_token'
            rv = self.make_request('post', '/api/users/{}/reset_password'.format(user.id), user=admin_user)
            self.assertEqual(rv.status_code, 200)
            send_password_reset_email_mock.assert_called_with(user)

        # disable user; now should not receive email
        user.disable()
        self.db.session.add(user)
        self.db.session.commit()

        with patch('redash.handlers.users.send_password_reset_email') as send_password_reset_email_mock:
            send_password_reset_email_mock.return_value = 'reset_token'
            rv = self.make_request('post', '/api/users/{}/reset_password'.format(user.id), user=admin_user)
            self.assertEqual(rv.status_code, 404)
            send_password_reset_email_mock.assert_not_called()
