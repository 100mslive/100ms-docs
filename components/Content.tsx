/* eslint-disable import/no-cycle */
/* eslint-disable global-require */
/* eslint-disable react/no-danger */
import Markdown from 'markdown-to-jsx';
import React from 'react';

import Basics from '../common/basics.md';
import Network from '../common/network.md';
import Token from '../common/token.md';
import TemplatesRoles from '../common/templates-and-roles.md';
import SecurityTokens from '../common/security-tokens.md';
import DomainsPorts from '../common/firewall-and-ports.md';

const data = {
    basics: Basics,
    templatesAndRoles: TemplatesRoles,
    network: Network,
    token: Token,
    securityAndTokens: SecurityTokens,
    domainsAndPorts: DomainsPorts
};

interface Props {
    alias: keyof typeof data;
}

const Content = ({ alias }: Props) => {
    const str = data[alias];
    return <Markdown>{str}</Markdown>;
};

export default Content;
