import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotificationList } from './NotificationList';
import withMock from 'storybook-addon-mock';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
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
