import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Card,
  Button,
  IconButton,
  Icon,
  ActionRow,
} from '@edx/paragon';
import { DeleteOutline } from '@edx/paragon/icons';

import {
  FormattedMessage,
  injectIntl,
} from '@edx/frontend-platform/i18n';
import { thunkActions, actions } from '../../../../../../data/redux';

import TranscriptActionMenu from './TranscriptActionMenu';
import LanguageSelector from './LanguageSelector';
import * as module from './Transcript';
import messages from './messages';

export const hooks = {
  state: {
  // eslint-disable-next-line react-hooks/rules-of-hooks
    inDeleteConfirmation: (args) => React.useState(args),
  },
  setUpDeleteConfirmation: () => {
    const [inDeleteConfirmation, setInDeleteConfirmation] = module.hooks.state.inDeleteConfirmation(false);
    return {
      inDeleteConfirmation,
      launchDeleteConfirmation: () => setInDeleteConfirmation(true),
      cancelDelete: () => setInDeleteConfirmation(false),
    };
  },
};

export const Transcript = ({
  index,
  language,
  transcriptUrl,
  // redux
  deleteTranscript,
  sharedVideoWarning,
  clearSharedVideoWarning,
}) => {
  const { inDeleteConfirmation, launchDeleteConfirmation, cancelDelete } = module.hooks.setUpDeleteConfirmation();
  const isSharedWarning = true // sharedVideoWarning && sharedVideoWarning.language === language;

  if (isSharedWarning) {
    return (
      <Card className="mb-2">
        <Card.Header title={(<FormattedMessage {...messages.sharedVideoTitle} />)} />
        <Card.Body>
          <Card.Section>
            <FormattedMessage {...messages.sharedVideoMessage} />
          </Card.Section>
          <Card.Footer>
            <Button
              variant="tertiary"
              className="mb-2 mb-sm-0"
              onClick={clearSharedVideoWarning}
            >
              <FormattedMessage {...messages.cancelDeleteLabel} />
            </Button>
            <Button
              variant="outline-primary"
              className="mb-2 mb-sm-0"
              onClick={() => {
                clearSharedVideoWarning();
                deleteTranscript({ language, action: 'disconnect' });
              }}
            >
              <FormattedMessage {...messages.disconnectAndRemoveLabel} />
            </Button>
            <Button
              variant="danger"
              className="mb-2 mb-sm-0"
              onClick={() => {
                clearSharedVideoWarning();
                deleteTranscript({ language, action: 'delete_all' });
              }}
            >
              <FormattedMessage {...messages.removeForAllCopiesLabel} />
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {inDeleteConfirmation
        ? (
          <Card className="mb-2">
            <Card.Header title={(<FormattedMessage {...messages.deleteConfirmationHeader} />)} />
            <Card.Body>
              <Card.Section>
                <FormattedMessage {...messages.deleteConfirmationMessage} />
              </Card.Section>
              <Card.Footer>
                <Button variant="tertiary" className="mb-2 mb-sm-0" onClick={cancelDelete}>
                  <FormattedMessage {...messages.cancelDeleteLabel} />
                </Button>
                <Button
                  variant="danger"
                  className="mb-2 mb-sm-0"
                  onClick={() => {
                    deleteTranscript({ language });
                    cancelDelete();
                  }}
                >
                  <FormattedMessage {...messages.confirmDeleteLabel} />
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card>
        )
        : (
          <ActionRow>
            <LanguageSelector
              title={index}
              language={language}
            />
            <ActionRow.Spacer />
            { language === '' ? (
              <IconButton
                iconAs={Icon}
                src={DeleteOutline}
                onClick={() => launchDeleteConfirmation()}
              />
            ) : (
              <TranscriptActionMenu
                index={index}
                language={language}
                transcriptUrl={transcriptUrl}
                launchDeleteConfirmation={launchDeleteConfirmation}
              />
            )}
          </ActionRow>
        )}
    </>
  );
};

Transcript.defaultProps = {
  transcriptUrl: undefined,
  sharedVideoWarning: null,
};

Transcript.propTypes = {
  index: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  transcriptUrl: PropTypes.string,
  deleteTranscript: PropTypes.func.isRequired,
  sharedVideoWarning: PropTypes.shape({
    language: PropTypes.string,
  }),
  clearSharedVideoWarning: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  sharedVideoWarning: state.video.sharedVideoWarning || null,
});
export const mapDispatchToProps = (dispatch) => ({
  deleteTranscript: ({ language, action }) => dispatch(thunkActions.video.deleteTranscript({ language, action })),
  clearSharedVideoWarning: () => dispatch(actions.video.updateField({ sharedVideoWarning: null })),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Transcript));
