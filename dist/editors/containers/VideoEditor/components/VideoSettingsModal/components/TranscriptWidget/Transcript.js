"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps = exports.mapDispatchToProps = exports.hooks = exports.default = exports.Transcript = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _i18n = require("@edx/frontend-platform/i18n");
var _redux = require("../../../../../../data/redux");
var _TranscriptActionMenu = _interopRequireDefault(require("./TranscriptActionMenu"));
var _LanguageSelector = _interopRequireDefault(require("./LanguageSelector"));
var _module = _interopRequireWildcard(require("./Transcript"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const hooks = exports.hooks = {
  state: {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inDeleteConfirmation: args => _react.default.useState(args)
  },
  setUpDeleteConfirmation: () => {
    const [inDeleteConfirmation, setInDeleteConfirmation] = _module.hooks.state.inDeleteConfirmation(false);
    return {
      inDeleteConfirmation,
      launchDeleteConfirmation: () => setInDeleteConfirmation(true),
      cancelDelete: () => setInDeleteConfirmation(false)
    };
  }
};
const Transcript = ({
  index,
  language,
  transcriptUrl,
  // redux
  deleteTranscript,
  replaceTranscript,
  sharedVideoWarning,
  clearSharedVideoWarning
}) => {
  const {
    inDeleteConfirmation,
    launchDeleteConfirmation,
    cancelDelete
  } = _module.hooks.setUpDeleteConfirmation();
  const isSharedWarning = sharedVideoWarning && sharedVideoWarning.language === language;
  if (isSharedWarning) {
    const {
      replaceData
    } = sharedVideoWarning;
    const handleAction = action => {
      clearSharedVideoWarning();
      if (replaceData) {
        replaceTranscript(_objectSpread({
          language,
          action
        }, replaceData));
      } else {
        deleteTranscript({
          language,
          action
        });
      }
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
      className: "mb-2",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Header, {
        title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.sharedVideoTitle))
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card.Body, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Section, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.sharedVideoMessage))
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card.Footer, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            variant: "tertiary",
            className: "mb-2 mb-sm-0",
            onClick: clearSharedVideoWarning,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.cancelDeleteLabel))
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            variant: "outline-primary",
            className: "mb-2 mb-sm-0",
            onClick: () => handleAction('disconnect'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.disconnectAndRemoveLabel))
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            variant: "danger",
            className: "mb-2 mb-sm-0",
            onClick: () => handleAction('delete_all'),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.removeForAllCopiesLabel))
          })]
        })]
      })]
    });
  }
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-useless-fragment
    (0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: inDeleteConfirmation ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card, {
        className: "mb-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Header, {
          title: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.deleteConfirmationHeader))
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card.Body, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Card.Section, {
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.deleteConfirmationMessage))
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Card.Footer, {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
              variant: "tertiary",
              className: "mb-2 mb-sm-0",
              onClick: cancelDelete,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.cancelDeleteLabel))
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
              variant: "danger",
              className: "mb-2 mb-sm-0",
              onClick: () => {
                deleteTranscript({
                  language
                });
                cancelDelete();
              },
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, _objectSpread({}, _messages.default.confirmDeleteLabel))
            })]
          })]
        })]
      }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.ActionRow, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LanguageSelector.default, {
          title: index,
          language: language
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.ActionRow.Spacer, {}), language === '' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
          iconAs: _paragon.Icon,
          src: _icons.DeleteOutline,
          onClick: () => launchDeleteConfirmation()
        }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_TranscriptActionMenu.default, {
          index: index,
          language: language,
          transcriptUrl: transcriptUrl,
          launchDeleteConfirmation: launchDeleteConfirmation
        })]
      })
    })
  );
};
exports.Transcript = Transcript;
Transcript.defaultProps = {
  transcriptUrl: undefined,
  sharedVideoWarning: null
};
Transcript.propTypes = {
  index: _propTypes.default.number.isRequired,
  language: _propTypes.default.string.isRequired,
  transcriptUrl: _propTypes.default.string,
  deleteTranscript: _propTypes.default.func.isRequired,
  replaceTranscript: _propTypes.default.func.isRequired,
  sharedVideoWarning: _propTypes.default.shape({
    language: _propTypes.default.string,
    replaceData: _propTypes.default.shape({
      newFile: _propTypes.default.object,
      newFilename: _propTypes.default.string
    })
  }),
  clearSharedVideoWarning: _propTypes.default.func.isRequired
};
const mapStateToProps = state => ({
  sharedVideoWarning: state.video.sharedVideoWarning || null
});
exports.mapStateToProps = mapStateToProps;
const mapDispatchToProps = dispatch => ({
  deleteTranscript: ({
    language,
    action
  }) => dispatch(_redux.thunkActions.video.deleteTranscript({
    language,
    action
  })),
  replaceTranscript: ({
    language,
    action,
    newFile,
    newFilename
  }) => dispatch(_redux.thunkActions.video.replaceTranscript({
    language,
    action,
    newFile,
    newFilename
  })),
  clearSharedVideoWarning: () => dispatch(_redux.actions.video.updateField({
    sharedVideoWarning: null
  }))
});
exports.mapDispatchToProps = mapDispatchToProps;
var _default = exports.default = (0, _i18n.injectIntl)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Transcript));
//# sourceMappingURL=Transcript.js.map