"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.resampleImage = exports.fileSizeError = exports.fileInput = exports.deleteThumbnail = exports.default = exports.createResampledFile = exports.checkValidSize = exports.checkValidDimensions = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("../../../../../../data/redux");
var constants = _interopRequireWildcard(require("./constants"));
var _module = _interopRequireWildcard(require("./hooks"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const state = exports.state = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  showSizeError: args => _react.default.useState(args)
};

/** resampledFile({ canvasUrl, filename, mimeType })
 * resampledFile takes a canvasUrl, filename, and a valid mimeType. The
 * canvasUrl is parsed and written to an 8-bit array of unsigned integers. The
 * new array is saved to  a new file with the same filename as the original image.
 * @param {string} canvasUrl - string of base64 URL for new image canvas
 * @param {string} filename - string of the original image's filename
 * @param {string} mimeType - string of mimeType for the canvas
 * @return {File} new File object
 */
const createResampledFile = ({
  canvasUrl,
  filename,
  mimeType
}) => {
  const arr = canvasUrl.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mimeType
  });
};

/** resampleImage({ image, filename })
 * resampledImage takes a canvasUrl, filename, and a valid mimeType. The
 * canvasUrl is parsed and written to an 8-bit array of unsigned integers. The
 * new array is saved to  a new file with the same filename as the original image.
 * @param {File} canvasUrl - string of base64 URL for new image canvas
 * @param {string} filename - string of the image's filename
 * @return {array} array containing the base64 URL for the resampled image and the file containing the resampled image
 */
exports.createResampledFile = createResampledFile;
const resampleImage = ({
  image,
  filename
}) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Determine new dimensions for image
  if (image.naturalWidth > constants.MAX_WIDTH) {
    // Set dimensions to the maximum size
    canvas.width = constants.MAX_WIDTH;
    canvas.height = constants.MAX_HEIGHT;
  } else if (image.naturalWidth < constants.MIN_WIDTH) {
    // Set dimensions to the minimum size
    canvas.width = constants.MIN_WIDTH;
    canvas.height = constants.MIN_HEIGHT;
  } else {
    // Set dimensions to the closest 16:9 ratio
    const heightRatio = 9 / 16;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalWidth * heightRatio;
  }
  const cropLeft = (image.naturalWidth - canvas.width) / 2;
  const cropTop = (image.naturalHeight - canvas.height) / 2;
  ctx.drawImage(image, cropLeft, cropTop, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  const resampledFile = _module.createResampledFile({
    canvasUrl: canvas.toDataURL(),
    filename,
    mimeType: 'image/png'
  });
  return [canvas.toDataURL(), resampledFile];
};
exports.resampleImage = resampleImage;
const checkValidDimensions = ({
  width,
  height
}) => {
  if (width < constants.MIN_WIDTH || height < height.MIN_WIDTH) {
    return false;
  }
  const imageAspectRatio = Math.abs(width / height - constants.ASPECT_RATIO);
  if (imageAspectRatio >= constants.ASPECT_RATIO_ERROR_MARGIN) {
    return false;
  }
  return true;
};
exports.checkValidDimensions = checkValidDimensions;
const checkValidSize = ({
  file,
  onSizeFail
}) => {
  // Check if the file size is greater than 2 MB, upload size maximum, or
  // if the file size is greater than 2 KB, upload size minimum
  if (file.size > constants.MAX_FILE_SIZE_MB || file.size < constants.MIN_FILE_SIZE_KB) {
    onSizeFail();
    return false;
  }
  return true;
};
exports.checkValidSize = checkValidSize;
const fileInput = ({
  setThumbnailSrc,
  imgRef,
  fileSizeError
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = (0, _reactRedux.useDispatch)();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = _react.default.useRef();
  const click = () => ref.current.click();
  const addFile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file && _module.checkValidSize({
      file,
      onSizeFail: () => {
        fileSizeError.set();
      }
    })) {
      reader.onload = () => {
        setThumbnailSrc(reader.result);
        const image = imgRef.current;
        image.onload = () => {
          if (!_module.checkValidDimensions({
            width: image.naturalWidth,
            height: image.naturalHeight
          })) {
            const [resampledUrl, resampledFile] = _module.resampleImage({
              image,
              filename: file.name
            });
            setThumbnailSrc(resampledUrl);
            dispatch(_redux.thunkActions.video.uploadThumbnail({
              thumbnail: resampledFile
            }));
            dispatch(_redux.actions.video.updateField({
              thumbnail: resampledUrl
            }));
            return;
          }
          dispatch(_redux.thunkActions.video.uploadThumbnail({
            thumbnail: file
          }));
          dispatch(_redux.actions.video.updateField({
            thumbnail: reader.result
          }));
        };
      };
      dispatch(_redux.actions.video.updateField({
        thumbnail: ' '
      }));
      reader.readAsDataURL(file);
    }
  };
  return {
    click,
    addFile,
    ref
  };
};
exports.fileInput = fileInput;
const fileSizeError = () => {
  const [showSizeError, setShowSizeError] = _module.state.showSizeError(false);
  return {
    fileSizeError: {
      show: showSizeError,
      set: () => setShowSizeError(true),
      dismiss: () => setShowSizeError(false)
    }
  };
};
exports.fileSizeError = fileSizeError;
const deleteThumbnail = ({
  dispatch
}) => () => {
  dispatch(_redux.actions.video.updateField({
    thumbnail: null
  }));
  const emptyCanvas = document.createElement('canvas');
  const ctx = emptyCanvas.getContext('2d');
  emptyCanvas.width = constants.MAX_WIDTH;
  emptyCanvas.height = constants.MAX_HEIGHT;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, emptyCanvas.width, emptyCanvas.height);
  const file = createResampledFile({
    canvasUrl: emptyCanvas.toDataURL(),
    filename: 'blankThumbnail.png',
    mimeType: 'image/png'
  });
  dispatch(_redux.thunkActions.video.uploadThumbnail({
    thumbnail: file,
    emptyCanvas
  }));
};
exports.deleteThumbnail = deleteThumbnail;
var _default = exports.default = {
  fileInput,
  fileSizeError,
  deleteThumbnail
};
//# sourceMappingURL=hooks.js.map