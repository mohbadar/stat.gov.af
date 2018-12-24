from __future__ import print_function
import os
from .helpers import parse_boolean

if os.environ.get("REDASH_SAML_LOCAL_METADATA_PATH") is not None:
    print("DEPRECATION NOTICE:\n")
    print("SAML_LOCAL_METADATA_PATH is no longer supported. Only URL metadata is supported now, please update")
    print("your configuration and reload.")
    raise SystemExit(1)


PASSWORD_LOGIN_ENABLED = parse_boolean(os.environ.get("REDASH_PASSWORD_LOGIN_ENABLED", "true"))

SAML_METADATA_URL = os.environ.get("REDASH_SAML_METADATA_URL", "")
SAML_ENTITY_ID = os.environ.get("REDASH_SAML_ENTITY_ID", "")
SAML_NAMEID_FORMAT = os.environ.get("REDASH_SAML_NAMEID_FORMAT", "")
SAML_LOGIN_ENABLED = SAML_METADATA_URL != ""

DATE_FORMAT = os.environ.get("REDASH_DATE_FORMAT", "DD/MM/YY")

JWT_LOGIN_ENABLED = parse_boolean(os.environ.get("REDASH_JWT_LOGIN_ENABLED", "false"))
JWT_AUTH_ISSUER = os.environ.get("REDASH_JWT_AUTH_ISSUER", "")
JWT_AUTH_PUBLIC_CERTS_URL = os.environ.get("REDASH_JWT_AUTH_PUBLIC_CERTS_URL", "")
JWT_AUTH_AUDIENCE = os.environ.get("REDASH_JWT_AUTH_AUDIENCE", "")
JWT_AUTH_ALGORITHMS = os.environ.get("REDASH_JWT_AUTH_ALGORITHMS", "HS256,RS256,ES256").split(',')
JWT_AUTH_COOKIE_NAME = os.environ.get("REDASH_JWT_AUTH_COOKIE_NAME", "")
JWT_AUTH_HEADER_NAME = os.environ.get("REDASH_JWT_AUTH_HEADER_NAME", "")

FEATURE_SHOW_PERMISSIONS_CONTROL = parse_boolean(os.environ.get("REDASH_FEATURE_SHOW_PERMISSIONS_CONTROL", "false"))

settings = {
    "auth_password_login_enabled": PASSWORD_LOGIN_ENABLED,
    "auth_saml_enabled": SAML_LOGIN_ENABLED,
    "auth_saml_entity_id": SAML_ENTITY_ID,
    "auth_saml_metadata_url": SAML_METADATA_URL,
    "auth_saml_nameid_format": SAML_NAMEID_FORMAT,
    "date_format": DATE_FORMAT,
    "auth_jwt_login_enabled": JWT_LOGIN_ENABLED,
    "auth_jwt_auth_issuer": JWT_AUTH_ISSUER,
    "auth_jwt_auth_public_certs_url": JWT_AUTH_PUBLIC_CERTS_URL,
    "auth_jwt_auth_audience": JWT_AUTH_AUDIENCE,
    "auth_jwt_auth_algorithms": JWT_AUTH_ALGORITHMS,
    "auth_jwt_auth_cookie_name": JWT_AUTH_COOKIE_NAME,
    "auth_jwt_auth_header_name": JWT_AUTH_HEADER_NAME,
    "feature_show_permissions_control": FEATURE_SHOW_PERMISSIONS_CONTROL,
}
