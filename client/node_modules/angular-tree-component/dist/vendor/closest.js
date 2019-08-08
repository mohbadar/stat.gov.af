// element-closest | CC0-1.0 | github.com/jonathantneal/closest
if (typeof Element !== 'undefined') {
    if (typeof Element.prototype.matches !== 'function') {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype['mozMatchesSelector'] ||
            Element.prototype.webkitMatchesSelector ||
            function matches(selector) {
                var element = this;
                var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
                var index = 0;
                while (elements[index] && elements[index] !== element) {
                    ++index;
                }
                return Boolean(elements[index]);
            };
    }
    if (typeof Element.prototype['closest'] !== 'function') {
        Element.prototype['closest'] = function closest(selector) {
            var element = this;
            while (element && element.nodeType === 1) {
                if (element.matches(selector)) {
                    return element;
                }
                element = element.parentNode;
            }
            return null;
        };
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi92ZW5kb3IvY2xvc2VzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrREFBK0Q7QUFDL0QsSUFBSSxPQUFPLE9BQU8sS0FBSyxXQUFXLEVBQUU7SUFDbEMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtRQUNuRCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFpQjtZQUMzRCxPQUFPLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxTQUFTLENBQUMscUJBQXFCO1lBQ3ZDLGlCQUFpQixRQUFRO2dCQUN2QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3RGLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFFZCxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssT0FBTyxFQUFFO29CQUNyRCxFQUFFLEtBQUssQ0FBQztpQkFDVDtnQkFFRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUM7S0FDUDtJQUVELElBQUksT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUN0RCxPQUFPLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGlCQUFpQixRQUFRO1lBQ3RELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUVuQixPQUFPLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDeEMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM3QixPQUFPLE9BQU8sQ0FBQztpQkFDaEI7Z0JBRUQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7YUFDOUI7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztLQUNIO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBlbGVtZW50LWNsb3Nlc3QgfCBDQzAtMS4wIHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL2Nsb3Nlc3RcbmlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgaWYgKHR5cGVvZiBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9IEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlWydtb3pNYXRjaGVzU2VsZWN0b3InXSB8fFxuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2hlcyhzZWxlY3Rvcikge1xuICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcztcbiAgICAgICAgICBsZXQgZWxlbWVudHMgPSAoZWxlbWVudC5kb2N1bWVudCB8fCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICAgICAgICB3aGlsZSAoZWxlbWVudHNbaW5kZXhdICYmIGVsZW1lbnRzW2luZGV4XSAhPT0gZWxlbWVudCkge1xuICAgICAgICAgICAgKytpbmRleDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gQm9vbGVhbihlbGVtZW50c1tpbmRleF0pO1xuICAgICAgICB9O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBFbGVtZW50LnByb3RvdHlwZVsnY2xvc2VzdCddICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgRWxlbWVudC5wcm90b3R5cGVbJ2Nsb3Nlc3QnXSA9IGZ1bmN0aW9uIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcbiAgICAgIGxldCBlbGVtZW50ID0gdGhpcztcblxuICAgICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICBpZiAoZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgfVxufVxuIl19