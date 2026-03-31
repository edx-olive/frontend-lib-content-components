"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syntaxChecker = exports.state = exports.prepareShowBtnEscapeHTML = exports.escapeHTMLSpecialChars = exports.createCodeMirrorDomNode = exports.cleanHTML = void 0;
var _react = _interopRequireWildcard(require("react"));
var _xmlchecker = _interopRequireDefault(require("xmlchecker"));
var _codemirror = require("codemirror");
var _state = require("@codemirror/state");
var _view = require("@codemirror/view");
var _langHtml = require("@codemirror/lang-html");
var _langXml = require("@codemirror/lang-xml");
var _lint = require("@codemirror/lint");
var _constants = _interopRequireDefault(require("./constants"));
require("./index.scss");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const CODEMIRROR_LANGUAGES = {
  HTML: 'html',
  XML: 'xml'
};
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showBtnEscapeHTML: val => _react.default.useState(val)
};
const prepareShowBtnEscapeHTML = () => {
  const [visibility, setVisibility] = state.showBtnEscapeHTML(true);
  const hide = () => setVisibility(false);
  return {
    showBtnEscapeHTML: visibility,
    hideBtn: hide
  };
};
exports.prepareShowBtnEscapeHTML = prepareShowBtnEscapeHTML;
const cleanHTML = ({
  initialText
}) => {
  const translateRegex = new RegExp(`&(${Object.keys(_constants.default).join('|')});`, 'g');
  const translator = ($0, $1) => _constants.default[$1];
  return initialText.replace(translateRegex, translator);
};
exports.cleanHTML = cleanHTML;
const syntaxChecker = ({
  textArr,
  lang
}) => {
  const diagnostics = [];
  if (lang === 'xml' && textArr) {
    const docString = textArr.join('\n');
    const xmlDoc = `<?xml version="1.0" encoding="UTF-8"?> ${docString}`;
    try {
      _xmlchecker.default.check(xmlDoc);
    } catch (error) {
      let errorStart = 0;
      for (let i = 0; i < error.line - 1; i++) {
        errorStart += textArr[i].length;
      }
      const errorLine = error.line;
      const errorEnd = errorStart + textArr[errorLine - 1].length;
      diagnostics.push({
        from: errorStart,
        to: errorEnd,
        severity: 'error',
        message: `${error.name}: ${error.message}`
      });
    }
  }
  return diagnostics;
};
exports.syntaxChecker = syntaxChecker;
const createCodeMirrorDomNode = ({
  ref,
  initialText,
  upstreamRef,
  lang
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  (0, _react.useEffect)(() => {
    const languageExtension = lang === CODEMIRROR_LANGUAGES.HTML ? (0, _langHtml.html)() : (0, _langXml.xml)();
    const cleanText = cleanHTML({
      initialText
    });
    const newState = _state.EditorState.create({
      doc: cleanText,
      extensions: [_codemirror.basicSetup, languageExtension, _view.EditorView.lineWrapping, (0, _lint.linter)(view => {
        const textArr = view.state.doc.text;
        return syntaxChecker({
          textArr,
          lang
        });
      })]
    });
    const view = new _view.EditorView({
      state: newState,
      parent: ref.current
    });
    // eslint-disable-next-line no-param-reassign
    upstreamRef.current = view;
    view.focus();
    return () => {
      // called on cleanup
      view.destroy();
    };
  }, []);
};
exports.createCodeMirrorDomNode = createCodeMirrorDomNode;
const escapeHTMLSpecialChars = ({
  ref,
  hideBtn
}) => {
  const text = ref.current.state.doc.toString();
  let pos = 0;
  const changes = [];
  Object.keys(_constants.default).forEach(escapedKeyword => {
    // eslint-disable-next-line no-cond-assign
    for (let next; (next = text.indexOf(_constants.default[escapedKeyword], pos)) > -1;) {
      changes.push({
        from: next,
        to: next + 1,
        insert: `&${escapedKeyword};`
      });
      pos = next + 1;
    }
  });
  ref.current.dispatch({
    changes
  });
  hideBtn();
};
exports.escapeHTMLSpecialChars = escapeHTMLSpecialChars;
//# sourceMappingURL=hooks.js.map