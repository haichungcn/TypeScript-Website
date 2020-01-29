define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * These are the defaults, but they also act as the list of all compiler options
     * which are parsed in the query params.
     */
    function getDefaultSandboxCompilerOptions(config, monaco) {
        const settings = {
            noImplicitAny: true,
            strictNullChecks: !config.useJavaScript,
            strictFunctionTypes: true,
            strictPropertyInitialization: true,
            strictBindCallApply: true,
            noImplicitThis: true,
            noImplicitReturns: true,
            // 3.7 off, 3.8 on I think
            useDefineForClassFields: false,
            alwaysStrict: true,
            allowUnreachableCode: false,
            allowUnusedLabels: false,
            downlevelIteration: false,
            noEmitHelpers: false,
            noLib: false,
            noStrictGenericChecks: false,
            noUnusedLocals: false,
            noUnusedParameters: false,
            esModuleInterop: true,
            preserveConstEnums: false,
            removeComments: false,
            skipLibCheck: false,
            checkJs: config.useJavaScript,
            allowJs: config.useJavaScript,
            declaration: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            target: monaco.languages.typescript.ScriptTarget.ES2017,
            jsx: monaco.languages.typescript.JsxEmit.React,
            module: monaco.languages.typescript.ModuleKind.ESNext,
        };
        return settings;
    }
    exports.getDefaultSandboxCompilerOptions = getDefaultSandboxCompilerOptions;
    /**
     * Loop through all of the entries in the existing compiler options then compare them with the
     * query params and return an object which is the changed settings via the query params
     */
    exports.getCompilerOptionsFromParams = (options, params) => {
        const urlDefaults = Object.entries(options).reduce((acc, [key, value]) => {
            if (params.has(key)) {
                const urlValue = params.get(key);
                if (urlValue === 'true') {
                    acc[key] = true;
                }
                else if (urlValue === 'false') {
                    acc[key] = false;
                }
                else if (!isNaN(parseInt(urlValue, 10))) {
                    acc[key] = parseInt(urlValue, 10);
                }
            }
            return acc;
        }, {});
        return urlDefaults;
    };
    // Can't set sandbox to be the right type because the param would contain this function
    /** Gets a query string representation (hash + queries) */
    exports.getURLQueryWithCompilerOptions = (sandbox, paramOverrides) => {
        const compilerOptions = sandbox.getCompilerOptions();
        const compilerDefaults = sandbox.compilerDefaults;
        const diff = Object.entries(compilerOptions).reduce((acc, [key, value]) => {
            if (value !== compilerDefaults[key]) {
                // @ts-ignore
                acc[key] = compilerOptions[key];
            }
            return acc;
        }, {});
        // The text of the TS/JS as the hash
        const hash = `code/${sandbox.lzstring.compressToEncodedURIComponent(sandbox.getText())}`;
        let urlParams = Object.assign({}, diff);
        for (const param of ['lib', 'ts']) {
            const params = new URLSearchParams(location.search);
            if (params.has(param)) {
                // Special case the nightly where it uses the TS version to hardcode
                // the nightly build
                if (param === 'ts' && params.get(param) === 'Nightly') {
                    urlParams['ts'] = sandbox.ts.version;
                }
                else {
                    urlParams['ts'] = params.get(param);
                }
            }
        }
        // Support sending the selection
        const s = sandbox.editor.getSelection();
        if ((s && s.selectionStartLineNumber !== s.positionLineNumber) ||
            (s && s.selectionStartColumn !== s.positionColumn)) {
            urlParams['ssl'] = s.selectionStartLineNumber;
            urlParams['ssc'] = s.selectionStartColumn;
            urlParams['pln'] = s.positionLineNumber;
            urlParams['pc'] = s.positionColumn;
        }
        if (sandbox.config.useJavaScript)
            urlParams['useJavaScript'] = true;
        if (paramOverrides) {
            urlParams = Object.assign(Object.assign({}, urlParams), paramOverrides);
        }
        if (Object.keys(urlParams).length > 0) {
            const queryString = Object.entries(urlParams)
                .filter(([_k, v]) => Boolean(v))
                .map(([key, value]) => {
                return `${key}=${encodeURIComponent(value)}`;
            })
                .join('&');
            return `?${queryString}#${hash}`;
        }
        else {
            return `#${hash}`;
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJPcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2FuZGJveC9zcmMvY29tcGlsZXJPcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBOzs7T0FHRztJQUNILFNBQWdCLGdDQUFnQyxDQUFDLE1BQXdCLEVBQUUsTUFBYztRQUN2RixNQUFNLFFBQVEsR0FBb0I7WUFDaEMsYUFBYSxFQUFFLElBQUk7WUFDbkIsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYTtZQUN2QyxtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLDRCQUE0QixFQUFFLElBQUk7WUFDbEMsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixjQUFjLEVBQUUsSUFBSTtZQUNwQixpQkFBaUIsRUFBRSxJQUFJO1lBRXZCLDBCQUEwQjtZQUMxQix1QkFBdUIsRUFBRSxLQUFLO1lBRTlCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLG9CQUFvQixFQUFFLEtBQUs7WUFDM0IsaUJBQWlCLEVBQUUsS0FBSztZQUV4QixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEtBQUssRUFBRSxLQUFLO1lBQ1oscUJBQXFCLEVBQUUsS0FBSztZQUM1QixjQUFjLEVBQUUsS0FBSztZQUNyQixrQkFBa0IsRUFBRSxLQUFLO1lBRXpCLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsY0FBYyxFQUFFLEtBQUs7WUFDckIsWUFBWSxFQUFFLEtBQUs7WUFFbkIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxhQUFhO1lBQzdCLE9BQU8sRUFBRSxNQUFNLENBQUMsYUFBYTtZQUM3QixXQUFXLEVBQUUsSUFBSTtZQUVqQixzQkFBc0IsRUFBRSxJQUFJO1lBQzVCLHFCQUFxQixFQUFFLElBQUk7WUFDM0IsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsTUFBTTtZ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LEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDcEIsT0FBTyxHQUFHLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxLQUFlLENBQUMsRUFBRSxDQUFBO1lBQ3hELENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7WUFFWixPQUFPLElBQUksV0FBVyxJQUFJLElBQUksRUFBRSxDQUFBO1NBQ2pDO2FBQU07WUFDTCxPQUFPLElBQUksSUFBSSxFQUFFLENBQUE7U0FDbEI7SUFDSCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5Z3JvdW5kQ29uZmlnIH0gZnJvbSAnLidcblxudHlwZSBDb21waWxlck9wdGlvbnMgPSBpbXBvcnQoJ21vbmFjby1lZGl0b3InKS5sYW5ndWFnZXMudHlwZXNjcmlwdC5Db21waWxlck9wdGlvbnNcbnR5cGUgTW9uYWNvID0gdHlwZW9mIGltcG9ydCgnbW9uYWNvLWVkaXRvcicpXG5cbi8qKlxuICogVGhlc2UgYXJlIHRoZSBkZWZhdWx0cywgYnV0IHRoZXkgYWxzbyBhY3QgYXMgdGhlIGxpc3Qgb2YgYWxsIGNvbXBpbGVyIG9wdGlvbnNcbiAqIHdoaWNoIGFyZSBwYXJzZWQgaW4gdGhlIHF1ZXJ5IHBhcmFtcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRTYW5kYm94Q29tcGlsZXJPcHRpb25zKGNvbmZpZzogUGxheWdyb3VuZENvbmZpZywgbW9uYWNvOiBNb25hY28pIHtcbiAgY29uc3Qgc2V0dGluZ3M6IENvbXBpbGVyT3B0aW9ucyA9IHtcbiAgICBub0ltcGxpY2l0QW55OiB0cnVlLFxuICAgIHN0cmljdE51bGxDaGVja3M6ICFjb25maWcudXNlSmF2YVNjcmlwdCxcbiAgICBzdHJpY3RGdW5jdGlvblR5cGVzOiB0cnVlLFxuICAgIHN0cmljdFByb3BlcnR5SW5pdGlhbGl6YXRpb246IHRydWUsXG4gICAgc3RyaWN0QmluZENhbGxBcHBseTogdHJ1ZSxcbiAgICBub0ltcGxpY2l0VGhpczogdHJ1ZSxcbiAgICBub0ltcGxpY2l0UmV0dXJuczogdHJ1ZSxcblxuICAgIC8vIDMuNyBvZmYsIDMuOCBvbiBJIHRoaW5rXG4gICAgdXNlRGVmaW5lRm9yQ2xhc3NGaWVsZHM6IGZhbHNlLFxuXG4gICAgYWx3YXlzU3RyaWN0OiB0cnVlLFxuICAgIGFsbG93VW5yZWFjaGFibGVDb2RlOiBmYWxzZSxcbiAgICBhbGxvd1VudXNlZExhYmVsczogZmFsc2UsXG5cbiAgICBkb3dubGV2ZWxJdGVyYXRpb246IGZhbHNlLFxuICAgIG5vRW1pdEhlbHBlcnM6IGZhbHNlLFxuICAgIG5vTGliOiBmYWxzZSxcbiAgICBub1N0cmljdEdlbmVyaWNDaGVja3M6IGZhbHNlLFxuICAgIG5vVW51c2VkTG9jYWxzOiBmYWxzZSxcbiAgICBub1VudXNlZFBhcmFtZXRlcnM6IGZhbHNlLFxuXG4gICAgZXNNb2R1bGVJbnRlcm9wOiB0cnVlLFxuICAgIHByZXNlcnZlQ29uc3RFbnVtczogZmFsc2UsXG4gICAgcmVtb3ZlQ29tbWVudHM6IGZhbHNlLFxuICAgIHNraXBMaWJDaGVjazogZmFsc2UsXG5cbiAgICBjaGVja0pzOiBjb25maWcudXNlSmF2YVNjcmlwdCxcbiAgICBhbGxvd0pzOiBjb25maWcudXNlSmF2YVNjcmlwdCxcbiAgICBkZWNsYXJhdGlvbjogdHJ1ZSxcblxuICAgIGV4cGVyaW1lbnRhbERlY29yYXRvcnM6IHRydWUsXG4gICAgZW1pdERlY29yYXRvck1ldGFkYXRhOiB0cnVlLFxuICAgIG1vZHVsZVJlc29sdXRpb246IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5Nb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlSnMsXG5cbiAgICB0YXJnZXQ6IG1vbmFjby5sYW5ndWFnZXMudHlwZXNjcmlwdC5TY3JpcHRUYXJnZXQuRVMyMDE3LFxuICAgIGpzeDogbW9uYWNvLmxhbmd1YWdlcy50eXBlc2NyaXB0LkpzeEVtaXQuUmVhY3QsXG4gICAgbW9kdWxlOiBtb25hY28ubGFuZ3VhZ2VzLnR5cGVzY3JpcHQuTW9kdWxlS2luZC5FU05leHQsXG4gIH1cblxuICByZXR1cm4gc2V0dGluZ3Ncbn1cblxuLyoqXG4gKiBMb29wIHRocm91Z2ggYWxsIG9mIHRoZSBlbnRyaWVzIGluIHRoZSBleGlzdGluZyBjb21waWxlciBvcHRpb25zIHRoZW4gY29tcGFyZSB0aGVtIHdpdGggdGhlXG4gKiBxdWVyeSBwYXJhbXMgYW5kIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggaXMgdGhlIGNoYW5nZWQgc2V0dGluZ3MgdmlhIHRoZSBxdWVyeSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbXBpbGVyT3B0aW9uc0Zyb21QYXJhbXMgPSAob3B0aW9uczogQ29tcGlsZXJPcHRpb25zLCBwYXJhbXM6IFVSTFNlYXJjaFBhcmFtcyk6IENvbXBpbGVyT3B0aW9ucyA9PiB7XG4gIGNvbnN0IHVybERlZmF1bHRzID0gT2JqZWN0LmVudHJpZXMob3B0aW9ucykucmVkdWNlKChhY2M6IGFueSwgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHBhcmFtcy5oYXMoa2V5KSkge1xuICAgICAgY29uc3QgdXJsVmFsdWUgPSBwYXJhbXMuZ2V0KGtleSkhXG5cbiAgICAgIGlmICh1cmxWYWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIGFjY1trZXldID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmICh1cmxWYWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICBhY2Nba2V5XSA9IGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKCFpc05hTihwYXJzZUludCh1cmxWYWx1ZSwgMTApKSkge1xuICAgICAgICBhY2Nba2V5XSA9IHBhcnNlSW50KHVybFZhbHVlLCAxMClcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0sIHt9KVxuXG4gIHJldHVybiB1cmxEZWZhdWx0c1xufVxuXG4vLyBDYW4ndCBzZXQgc2FuZGJveCB0byBiZSB0aGUgcmlnaHQgdHlwZSBiZWNhdXNlIHRoZSBwYXJhbSB3b3VsZCBjb250YWluIHRoaXMgZnVuY3Rpb25cblxuLyoqIEdldHMgYSBxdWVyeSBzdHJpbmcgcmVwcmVzZW50YXRpb24gKGhhc2ggKyBxdWVyaWVzKSAqL1xuZXhwb3J0IGNvbnN0IGdldFVSTFF1ZXJ5V2l0aENvbXBpbGVyT3B0aW9ucyA9IChzYW5kYm94OiBhbnksIHBhcmFtT3ZlcnJpZGVzPzogYW55KTogc3RyaW5nID0+IHtcbiAgY29uc3QgY29tcGlsZXJPcHRpb25zID0gc2FuZGJveC5nZXRDb21waWxlck9wdGlvbnMoKVxuICBjb25zdCBjb21waWxlckRlZmF1bHRzID0gc2FuZGJveC5jb21waWxlckRlZmF1bHRzXG4gIGNvbnN0IGRpZmYgPSBPYmplY3QuZW50cmllcyhjb21waWxlck9wdGlvbnMpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgIT09IGNvbXBpbGVyRGVmYXVsdHNba2V5XSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgYWNjW2tleV0gPSBjb21waWxlck9wdGlvbnNba2V5XVxuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSwge30pXG5cbiAgLy8gVGhlIHRleHQgb2YgdGhlIFRTL0pTIGFzIHRoZSBoYXNoXG4gIGNvbnN0IGhhc2ggPSBgY29kZS8ke3NhbmRib3gubHpzdHJpbmcuY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnQoc2FuZGJveC5nZXRUZXh0KCkpfWBcblxuICBsZXQgdXJsUGFyYW1zOiBhbnkgPSBPYmplY3QuYXNzaWduKHt9LCBkaWZmKVxuICBmb3IgKGNvbnN0IHBhcmFtIG9mIFsnbGliJywgJ3RzJ10pIHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaClcbiAgICBpZiAocGFyYW1zLmhhcyhwYXJhbSkpIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZSB0aGUgbmlnaHRseSB3aGVyZSBpdCB1c2VzIHRoZSBUUyB2ZXJzaW9uIHRvIGhhcmRjb2RlXG4gICAgICAvLyB0aGUgbmlnaHRseSBidWlsZFxuICAgICAgaWYgKHBhcmFtID09PSAndHMnICYmIHBhcmFtcy5nZXQocGFyYW0pID09PSAnTmlnaHRseScpIHtcbiAgICAgICAgdXJsUGFyYW1zWyd0cyddID0gc2FuZGJveC50cy52ZXJzaW9uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmxQYXJhbXNbJ3RzJ10gPSBwYXJhbXMuZ2V0KHBhcmFtKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFN1cHBvcnQgc2VuZGluZyB0aGUgc2VsZWN0aW9uXG4gIGNvbnN0IHMgPSBzYW5kYm94LmVkaXRvci5nZXRTZWxlY3Rpb24oKVxuICBpZiAoXG4gICAgKHMgJiYgcy5zZWxlY3Rpb25TdGFydExpbmVOdW1iZXIgIT09IHMucG9zaXRpb25MaW5lTnVtYmVyKSB8fFxuICAgIChzICYmIHMuc2VsZWN0aW9uU3RhcnRDb2x1bW4gIT09IHMucG9zaXRpb25Db2x1bW4pXG4gICkge1xuICAgIHVybFBhcmFtc1snc3NsJ10gPSBzLnNlbGVjdGlvblN0YXJ0TGluZU51bWJlclxuICAgIHVybFBhcmFtc1snc3NjJ10gPSBzLnNlbGVjdGlvblN0YXJ0Q29sdW1uXG4gICAgdXJsUGFyYW1zWydwbG4nXSA9IHMucG9zaXRpb25MaW5lTnVtYmVyXG4gICAgdXJsUGFyYW1zWydwYyddID0gcy5wb3NpdGlvbkNvbHVtblxuICB9XG5cbiAgaWYgKHNhbmRib3guY29uZmlnLnVzZUphdmFTY3JpcHQpIHVybFBhcmFtc1sndXNlSmF2YVNjcmlwdCddID0gdHJ1ZVxuXG4gIGlmIChwYXJhbU92ZXJyaWRlcykge1xuICAgIHVybFBhcmFtcyA9IHsgLi4udXJsUGFyYW1zLCAuLi5wYXJhbU92ZXJyaWRlcyB9XG4gIH1cblxuICBpZiAoT2JqZWN0LmtleXModXJsUGFyYW1zKS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgcXVlcnlTdHJpbmcgPSBPYmplY3QuZW50cmllcyh1cmxQYXJhbXMpXG4gICAgICAuZmlsdGVyKChbX2ssIHZdKSA9PiBCb29sZWFuKHYpKVxuICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIHJldHVybiBgJHtrZXl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlIGFzIHN0cmluZyl9YFxuICAgICAgfSlcbiAgICAgIC5qb2luKCcmJylcblxuICAgIHJldHVybiBgPyR7cXVlcnlTdHJpbmd9IyR7aGFzaH1gXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAjJHtoYXNofWBcbiAgfVxufVxuIl19