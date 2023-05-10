import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationButton } from './NotificationButton';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';
import withMock from 'storybook-addon-mock';

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.decorators = [storeDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/notifications',
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'notification',
          description: 'desc',
        },
        {
          id: '2',
          title: 'notification',
          description: 'desc',
        },
        {
          id: '3',
          title: 'notification',
          description: 'desc',
        },
      ],
    },
  ],
};
