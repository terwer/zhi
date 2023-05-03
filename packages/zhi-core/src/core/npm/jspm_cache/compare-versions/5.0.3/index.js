System.register([],function(_export,_context){"use strict";var compareVersions,validate,compare,satisfies,t,validateAndParse,isWildcard,tryParse,forceType,compareStrings,compareSegments,n,e,assertValidOperator;return{setters:[],execute:function(){/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */_export("compareVersions",compareVersions=(t,n)=>{const e=validateAndParse(t);const o=validateAndParse(n);const r=e.pop();const s=o.pop();const c=compareSegments(e,o);return 0!==c?c:r&&s?compareSegments(r.split("."),s.split(".")):r||s?r?-1:1:0;});/**
 * Validate [semver](https://semver.org/) version strings.
 *
 * @param version Version number to validate
 * @returns `true` if the version number is a valid semver version number, `false` otherwise.
 *
 * @example
 * ```
 * validate('1.0.0-rc.1'); // return true
 * validate('1.0-rc.1'); // return false
 * validate('foo'); // return false
 * ```
 */_export("validate",validate=n=>"string"===typeof n&&/^[v\d]/.test(n)&&t.test(n));_export("compare",compare=(t,e,o)=>{assertValidOperator(o);const r=compareVersions(t,e);return n[o].includes(r);});/**
 * Match [npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver) version range.
 *
 * @param version Version number to match
 * @param range Range pattern for version
 * @returns `true` if the version number is within the range, `false` otherwise.
 *
 * @example
 * ```
 * satisfies('1.1.0', '^1.0.0'); // return true
 * satisfies('1.1.0', '~1.0.0'); // return false
 * ```
 */_export("satisfies",satisfies=(t,n)=>{const e=n.match(/^([<>=~^]+)/);const o=e?e[1]:"=";if("^"!==o&&"~"!==o)return compare(t,n,o);const[r,s,c,,i]=validateAndParse(t);const[f,d,l,,p]=validateAndParse(n);const a=[r,s,c];const u=[f,null!==d&&void 0!==d?d:"x",null!==l&&void 0!==l?l:"x"];if(p){if(!i)return false;if(0!==compareSegments(a,u))return false;if(-1===compareSegments(i.split("."),p.split(".")))return false;}const x=u.findIndex(t=>"0"!==t)+1;const g="~"===o?2:x>1?x:1;return 0===compareSegments(a.slice(0,g),u.slice(0,g))&&-1!==compareSegments(a.slice(g),u.slice(g));});t=/^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;validateAndParse=n=>{if("string"!==typeof n)throw new TypeError("Invalid argument expected string");const e=n.match(t);if(!e)throw new Error(`Invalid argument not valid semver ('${n}' received)`);e.shift();return e;};isWildcard=t=>"*"===t||"x"===t||"X"===t;tryParse=t=>{const n=parseInt(t,10);return isNaN(n)?t:n;};forceType=(t,n)=>typeof t!==typeof n?[String(t),String(n)]:[t,n];compareStrings=(t,n)=>{if(isWildcard(t)||isWildcard(n))return 0;const[e,o]=forceType(tryParse(t),tryParse(n));return e>o?1:e<o?-1:0;};compareSegments=(t,n)=>{for(let e=0;e<Math.max(t.length,n.length);e++){const o=compareStrings(t[e]||"0",n[e]||"0");if(0!==o)return o;}return 0;};n={">":[1],">=":[0,1],"=":[0],"<=":[-1,0],"<":[-1]};e=Object.keys(n);assertValidOperator=t=>{if("string"!==typeof t)throw new TypeError("Invalid operator type, expected string but got "+typeof t);if(-1===e.indexOf(t))throw new Error(`Invalid operator, expected one of ${e.join("|")}`);};}};});
//# sourceMappingURL=index.js.map