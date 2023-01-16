/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Markdown from 'markdown-to-jsx';
import React from 'react';
// Please use the same name as the md file to ensure
// it gets picked up by the script for updating algolia records
import Basics from '../common/basics.md';
import Token from '../common/token.md';
import TemplatesAndRoles from '../common/templates-and-roles.md';
import SecurityTokens1 from '../common/security-tokens-1.md';
import SecurityTokens2 from '../common/security-tokens-2.md';
import LiveStreaming from '../common/live-streaming.md';
import Recordings from '../common/recordings.md';
import AndroidSdkVersionShield from '../common/android-sdk-version-shield.md';
import BulkRoleChangeErrors from '../common/bulk-role-change-errors.md';
import RtmpExternalConfig from '../common/rtmp-external-config.md';
import StepsContainer from './StepsContainer';
import StepsToc from './StepsToc';

const data = {
    basics: Basics,
    templatesAndRoles: TemplatesAndRoles,
    network: Network,
    token: Token,
    securityTokens1: SecurityTokens1,
    securityTokens2: SecurityTokens2,
    liveStreaming: LiveStreaming,
    recordings: Recordings,
    rtmpExternalConfig: RtmpExternalConfig,
    androidSdkVersionShield: AndroidSdkVersionShield,
    bulkRoleChangeErrors: BulkRoleChangeErrors
};

interface Props {
    alias: keyof typeof data;
}

const Content = ({ alias }: Props) => {
    const str = data[alias];
    return (
        <Markdown
            options={{
                overrides: {
                    StepsContainer,
                    StepsToc
                }
            }}>
            {str}
        </Markdown>
    );
};

export default Content;
