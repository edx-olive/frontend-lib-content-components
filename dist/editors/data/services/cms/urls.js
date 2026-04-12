"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoTranscripts = exports.videoFeatures = exports.unit = exports.thumbnailUpload = exports.returnUrl = exports.replaceTranscript = exports.mediaTranscriptURL = exports.libraryV1 = exports.downloadVideoTranscriptURL = exports.downloadVideoHandoutUrl = exports.courseVideos = exports.courseDetailsUrl = exports.courseAssets = exports.courseAdvanceSettings = exports.checkTranscriptsForImport = exports.blockStudioView = exports.blockAncestor = exports.block = void 0;
const libraryV1 = ({
  studioEndpointUrl,
  learningContextId
}) => `${studioEndpointUrl}/library/${learningContextId}`;
exports.libraryV1 = libraryV1;
const unit = ({
  studioEndpointUrl,
  unitUrl
}) => `${studioEndpointUrl}/container/${unitUrl.data.ancestors[0]?.id}`;
exports.unit = unit;
const returnUrl = ({
  studioEndpointUrl,
  unitUrl,
  learningContextId,
  blockId
}) => {
  if (learningContextId && learningContextId.startsWith('library-v1')) {
    // when the learning context is a v1 library, return to the library page
    return libraryV1({
      studioEndpointUrl,
      learningContextId
    });
  }
  if (learningContextId && learningContextId.startsWith('lib')) {
    // when it's a v2 library, there will be no return url (instead a closed popup)
    // (temporary) don't throw error, just return empty url. it will fail it's network connection but otherwise
    // the app will run
    // throw new Error('Return url not available (or needed) for V2 libraries');
    return '';
  }
  // when the learning context is a course, return to the unit page
  // only do this for v1 blocks
  if (unitUrl && blockId.includes('block-v1')) {
    return unit({
      studioEndpointUrl,
      unitUrl
    });
  }
  return '';
};
exports.returnUrl = returnUrl;
const block = ({
  studioEndpointUrl,
  blockId
}) => blockId.startsWith('lb:') ? `${studioEndpointUrl}/api/xblock/v2/xblocks/${blockId}/fields/` : `${studioEndpointUrl}/xblock/${blockId}`;
exports.block = block;
const blockAncestor = ({
  studioEndpointUrl,
  blockId
}) => {
  if (blockId.includes('block-v1')) {
    return `${block({
      studioEndpointUrl,
      blockId
    })}?fields=ancestorInfo`;
  }
  // this url only need to get info to build the return url, which isn't used by V2 blocks
  // (temporary) don't throw error, just return empty url. it will fail it's network connection but otherwise
  // the app will run
  // throw new Error('Block ancestor not available (and not needed) for V2 blocks');
  return '';
};
exports.blockAncestor = blockAncestor;
const blockStudioView = ({
  studioEndpointUrl,
  blockId
}) => blockId.includes('block-v1') ? `${block({
  studioEndpointUrl,
  blockId
})}/studio_view` : `${studioEndpointUrl}/api/xblock/v2/xblocks/${blockId}/view/studio_view/`;
exports.blockStudioView = blockStudioView;
const courseAssets = ({
  studioEndpointUrl,
  learningContextId
}) => `${studioEndpointUrl}/assets/${learningContextId}/?page_size=500`;
exports.courseAssets = courseAssets;
const thumbnailUpload = ({
  studioEndpointUrl,
  learningContextId,
  videoId
}) => `${studioEndpointUrl}/video_images/${learningContextId}/${videoId}`;
exports.thumbnailUpload = thumbnailUpload;
const videoTranscripts = ({
  studioEndpointUrl,
  blockId
}) => `${block({
  studioEndpointUrl,
  blockId
})}/handler/studio_transcript/translation`;
exports.videoTranscripts = videoTranscripts;
const downloadVideoTranscriptURL = ({
  studioEndpointUrl,
  blockId,
  language
}) => `${videoTranscripts({
  studioEndpointUrl,
  blockId
})}?language_code=${language}`;
exports.downloadVideoTranscriptURL = downloadVideoTranscriptURL;
const mediaTranscriptURL = ({
  studioEndpointUrl,
  transcriptUrl
}) => `${studioEndpointUrl}${transcriptUrl}`;
exports.mediaTranscriptURL = mediaTranscriptURL;
const downloadVideoHandoutUrl = ({
  studioEndpointUrl,
  handout
}) => `${studioEndpointUrl}${handout}`;
exports.downloadVideoHandoutUrl = downloadVideoHandoutUrl;
const courseDetailsUrl = ({
  studioEndpointUrl,
  learningContextId
}) => `${studioEndpointUrl}/settings/details/${learningContextId}`;
exports.courseDetailsUrl = courseDetailsUrl;
const checkTranscriptsForImport = ({
  studioEndpointUrl,
  parameters
}) => `${studioEndpointUrl}/transcripts/check?data=${parameters}`;
exports.checkTranscriptsForImport = checkTranscriptsForImport;
const replaceTranscript = ({
  studioEndpointUrl,
  parameters
}) => `${studioEndpointUrl}/transcripts/replace?data=${parameters}`;
exports.replaceTranscript = replaceTranscript;
const courseAdvanceSettings = ({
  studioEndpointUrl,
  learningContextId
}) => `${studioEndpointUrl}/api/contentstore/v0/advanced_settings/${learningContextId}`;
exports.courseAdvanceSettings = courseAdvanceSettings;
const videoFeatures = ({
  studioEndpointUrl
}) => `${studioEndpointUrl}/video_features/`;
exports.videoFeatures = videoFeatures;
const courseVideos = ({
  studioEndpointUrl,
  learningContextId
}) => `${studioEndpointUrl}/videos/${learningContextId}`;
exports.courseVideos = courseVideos;
//# sourceMappingURL=urls.js.map