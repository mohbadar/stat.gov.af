/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Simple object check.
 * @param {?} item
 * @return {?}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
/**
 * Deep merge two objects.
 * @param {?} target
 * @param {...?} sources
 * @return {?}
 */
export function mergeDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    var _a, _b;
    if (!sources.length) {
        return target;
    }
    /** @type {?} */
    var source = sources.shift();
    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        }
    }
    return mergeDeep.apply(void 0, tslib_1.__spread([target], sources));
}
/**
 * Returns a readable number from share count
 * @param {?} num
 * @param {?} digits
 * @return {?}
 */
export function shareCountFormatter(num, digits) {
    /** @type {?} */
    var si = [
        { value: 1E9, symbol: 'B' },
        { value: 1E6, symbol: 'M' },
        { value: 1E3, symbol: 'K' }
    ];
    /** @type {?} */
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (var i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, '$1');
}
/**
 * Returns a valid URL or falls back to current URL
 * @param {?} url
 * @param {?} fallbackUrl
 * @return {?}
 */
export function getValidUrl(url, fallbackUrl) {
    if (url) {
        /** @type {?} */
        var r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (r.test(url))
            return url;
        console.warn("[ShareButtons]: Sharing link '" + url + "' is invalid!");
    }
    return fallbackUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LXNoYXJlL2NvcmUvIiwic291cmNlcyI6WyJsaWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLFNBQVMsUUFBUSxDQUFDLElBQUk7SUFDcEIsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDcEUsQ0FBQzs7Ozs7OztBQUdELE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBTTtJQUFFLGlCQUFVO1NBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtRQUFWLGdDQUFVOzs7SUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDbkIsT0FBTyxNQUFNLENBQUM7S0FDZjs7UUFDSyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRTtJQUU5QixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDeEMsS0FBSyxJQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDeEIsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFHLEdBQUMsR0FBRyxJQUFHLEVBQUUsTUFBRSxDQUFDO2lCQUNwQztnQkFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFHLEdBQUMsR0FBRyxJQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBRSxDQUFDO2FBQzdDO1NBQ0Y7S0FDRjtJQUVELE9BQU8sU0FBUyxpQ0FBQyxNQUFNLEdBQUssT0FBTyxHQUFFO0FBQ3ZDLENBQUM7Ozs7Ozs7QUFHRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsR0FBVyxFQUFFLE1BQWM7O1FBRXZELEVBQUUsR0FBRztRQUNULEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDO1FBQ3pCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDO1FBQ3pCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDO0tBQzFCOztRQUFFLEVBQUUsR0FBRywwQkFBMEI7SUFFbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQzdFO0tBQ0Y7SUFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMvQyxDQUFDOzs7Ozs7O0FBR0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFXLEVBQUUsV0FBbUI7SUFDMUQsSUFBSSxHQUFHLEVBQUU7O1lBQ0QsQ0FBQyxHQUFHLCtFQUErRTtRQUN6RixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBaUMsR0FBRyxrQkFBZSxDQUFDLENBQUM7S0FDbkU7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFNpbXBsZSBvYmplY3QgY2hlY2suKi9cclxuZnVuY3Rpb24gaXNPYmplY3QoaXRlbSk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiAoaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSkpO1xyXG59XHJcblxyXG4vKiogRGVlcCBtZXJnZSB0d28gb2JqZWN0cy4qL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEZWVwKHRhcmdldCwgLi4uc291cmNlcykge1xyXG4gIGlmICghc291cmNlcy5sZW5ndGgpIHtcclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgfVxyXG4gIGNvbnN0IHNvdXJjZSA9IHNvdXJjZXMuc2hpZnQoKTtcclxuXHJcbiAgaWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgIGlmIChpc09iamVjdChzb3VyY2Vba2V5XSkpIHtcclxuICAgICAgICBpZiAoIXRhcmdldFtrZXldKSB7XHJcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRhcmdldCwge1trZXldOiB7fX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZXJnZURlZXAodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRhcmdldCwge1trZXldOiBzb3VyY2Vba2V5XX0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWVyZ2VEZWVwKHRhcmdldCwgLi4uc291cmNlcyk7XHJcbn1cclxuXHJcbi8qKiBSZXR1cm5zIGEgcmVhZGFibGUgbnVtYmVyIGZyb20gc2hhcmUgY291bnQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYXJlQ291bnRGb3JtYXR0ZXIobnVtOiBudW1iZXIsIGRpZ2l0czogbnVtYmVyKTogc3RyaW5nIHtcclxuXHJcbiAgY29uc3Qgc2kgPSBbXHJcbiAgICB7dmFsdWU6IDFFOSwgc3ltYm9sOiAnQid9LFxyXG4gICAge3ZhbHVlOiAxRTYsIHN5bWJvbDogJ00nfSxcclxuICAgIHt2YWx1ZTogMUUzLCBzeW1ib2w6ICdLJ31cclxuICBdLCByeCA9IC9cXC4wKyR8KFxcLlswLTldKlsxLTldKTArJC87XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2kubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChudW0gPj0gc2lbaV0udmFsdWUpIHtcclxuICAgICAgcmV0dXJuIChudW0gLyBzaVtpXS52YWx1ZSkudG9GaXhlZChkaWdpdHMpLnJlcGxhY2UocngsICckMScpICsgc2lbaV0uc3ltYm9sO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVtLnRvRml4ZWQoZGlnaXRzKS5yZXBsYWNlKHJ4LCAnJDEnKTtcclxufVxyXG5cclxuLyoqIFJldHVybnMgYSB2YWxpZCBVUkwgb3IgZmFsbHMgYmFjayB0byBjdXJyZW50IFVSTCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmFsaWRVcmwodXJsOiBzdHJpbmcsIGZhbGxiYWNrVXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICh1cmwpIHtcclxuICAgIGNvbnN0IHIgPSAvKGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/LztcclxuICAgIGlmIChyLnRlc3QodXJsKSkgcmV0dXJuIHVybDtcclxuICAgIGNvbnNvbGUud2FybihgW1NoYXJlQnV0dG9uc106IFNoYXJpbmcgbGluayAnJHt1cmx9JyBpcyBpbnZhbGlkIWApO1xyXG4gIH1cclxuICByZXR1cm4gZmFsbGJhY2tVcmw7XHJcbn1cclxuIl19