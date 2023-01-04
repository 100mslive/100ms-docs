/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Markdown from 'markdown-to-jsx';
import React from 'react';
// Please use the same name as the md file to ensure
// it gets picked up by the script for updating algolia records
import Basics from '../common/basics.md';
import Network from '../common/network.md';
import Token from '../common/token.md';
import TokenEndpoint from '../common/token-endpoint.md';
import TemplatesAndRoles from '../common/templates-and-roles.md';
import SecurityTokens1 from '../common/security-tokens-1.md';
import SecurityTokens2 from '../common/security-tokens-2.md';
import FirewallAndPorts from '../common/firewall-and-ports.md';
import LiveStreaming from '../common/live-streaming.md';
import Recordings from '../common/recordings.md';
import AdaptiveBitrate1 from "../common/adaptive-bitrate-1.md";
import AdaptiveBitrate2 from "../common/adaptive-bitrate-2.md";
import AndroidSdkVersionShield from '../common/android-sdk-version-shield.md';
import BulkRoleChangeErrors from '../common/bulk-role-change-errors.md';
import StepsContainer from './StepsContainer';
import StepsToc from './StepsToc';

const data = {
    basics: Basics,
    templatesAndRoles: TemplatesAndRoles,
    network: Network,
    token: Token,
    tokenEndpoint: TokenEndpoint,
    securityTokens1: SecurityTokens1,
    securityTokens2: SecurityTokens2,
    firewallAndPorts: FirewallAndPorts,
    liveStreaming: LiveStreaming,
    recordings: Recordings,
    androidSdkVersionShield: AndroidSdkVersionShield,
    bulkRoleChangeErrors: BulkRoleChangeErrors,
    /**
     * Adaptive bitrate docs are split into 2 parts because 3-backtick
     * code snippets in `md` files are not rendering well in mdx
     */
    adaptiveBitrate1: AdaptiveBitrate1,
    adaptiveBitrate2: AdaptiveBitrate2
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
                    StepsContainer: StepsContainer,
                    StepsToc: StepsToc
                }
            }}>
            {str}
        </Markdown>
    );
};

export default Content;
