/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Markdown from 'markdown-to-jsx';
import React from 'react';

import Basics from '../common/basics.md';
import Network from '../common/network.md';
import Token from '../common/token.md';
import TemplatesRoles from '../common/templates-and-roles.md';
import SecurityTokens1 from '../common/security-tokens-1.md';
import SecurityTokens2 from '../common/security-tokens-2.md';
import DomainsPorts from '../common/firewall-and-ports.md';
import LiveStreaming from '../common/live-streaming.md';
import Recordings from '../common/basic_recording.md';

const data = {
    basics: Basics,
    templatesAndRoles: TemplatesRoles,
    network: Network,
    token: Token,
    securityAndTokens1: SecurityTokens1,
    securityAndTokens2: SecurityTokens2,
    domainsAndPorts: DomainsPorts,
    liveStreaming: LiveStreaming,
    Recordings: Recordings,
};

interface Props {
    alias: keyof typeof data;
}

const Content = ({ alias }: Props) => {
    const str = data[alias];
    return <Markdown>{str}</Markdown>;
};

export default Content;
