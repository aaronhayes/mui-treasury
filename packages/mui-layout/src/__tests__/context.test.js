import React from 'react';
import { render } from '@testing-library/react';
import { renderWithinTheme, renderWithinLayout } from 'testingUtils/renderer';
import { LayoutConsumer } from '../core/layoutContext';
import Sidebar from '../components/Sidebar';
import Root from '../components/Root';

describe('context', () => {
  test('Able to config in each screen', () => {
    const config = {
      screen: 'xs',
      xs: {
        sidebar: {
          variant: 'temporary',
        },
      },
      md: {
        sidebar: {
          variant: 'permanent',
        },
      },
    };
    const { queryByTestId, rerenderWithTheme } = renderWithinTheme(
      <Root config={config}>
        <Sidebar data-testid={'sidebar-root'} />
      </Root>
    );
    expect(queryByTestId('sidebar-root')).not.toBeInTheDocument();

    config.screen = 'md';
    rerenderWithTheme(
      <Root config={config}>
        <Sidebar data-testid={'sidebar-root'} />
      </Root>
    );
    expect(queryByTestId('sidebar-root')).toBeInTheDocument();
  });

  test('content provide correct structure', () => {
    const result = {};
    renderWithinLayout(
      <LayoutConsumer>
        {value => {
          Object.assign(result, value);
          return null;
        }}
      </LayoutConsumer>
    );

    expect(result).toMatchObject({
      opened: false,
      setOpened: expect.any(Function),
      collapsed: false,
      setCollapsed: expect.any(Function),
      secondaryOpened: false,
      setSecondaryOpened: expect.any(Function),
      secondaryCollapsed: false,
      setSecondaryCollapsed: expect.any(Function),
    });
  });
});
