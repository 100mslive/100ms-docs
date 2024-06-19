import React from 'react';
import { Text } from '@100mslive/react-ui';
import SidebarAccordion from './SidebarAccordion';
import SidebarMainHeading from './SidebarMainHeading';
import { ReactIcon as ReactNative } from '@100mslive/react-icons';
import { accordionIconStyle } from './constants';

const SidebarHeadingGroup = ({
    headings,
    openPlatformAccordion,
    setOpenPlatformAccordion,
    platformOrder,
    allNav,
    title
}) => {
    // const [open, setOpen] = useState(false);

    return headings
        ? headings?.map((heading, index) => {
              const renderElements = [<></>];

              if (index === 0 && title) {
                  renderElements.push(
                      <Text
                          css={{
                              color: '$textAccentDisabled',
                              fontSize: '$xs',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontWeight: '$semiBold'
                          }}>
                          {title}
                      </Text>
                  );
              }
              if (heading.key === 'client-sdk') {
                  renderElements.push(
                      <SidebarAccordion
                          title={heading.content}
                          icon={heading.icon}
                          openPlatformAccordion={openPlatformAccordion}
                          setOpenPlatformAccordion={setOpenPlatformAccordion}
                          platformOrder={platformOrder}
                          allNav={allNav}
                      />
                  );
              } else if (heading.key === 'server-side') {
                  renderElements.push(
                      <SidebarAccordion
                          title={heading.content}
                          icon={heading.icon}
                          openPlatformAccordion={openPlatformAccordion}
                          setOpenPlatformAccordion={setOpenPlatformAccordion}
                          platformOrder={[
                              {
                                  text: 'Server side',
                                  icon: <ReactNative style={accordionIconStyle} />,
                                  key: 'server-side'
                              }
                          ]}
                          allNav={allNav}
                          id="sidebar"
                      />
                  );
              } else {
                  renderElements.push(
                      <SidebarMainHeading
                          key={index}
                          content={heading.content}
                          icon={heading.icon}
                          route={heading.route}
                          customCss={heading.customCss}
                      />
                  );
              }

              if (index + 1 === headings.length) {
                  renderElements.push(<hr style={{ margin: '24px 0' }} />);
              }

              return renderElements;
          })
        : null;
};

export default SidebarHeadingGroup;
