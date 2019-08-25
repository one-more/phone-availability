import * as React from 'react';
import { Content, DeviceList, Header, HeaderComponent, Layout, withLoginRedirect } from '~/modules/app';

export const IndexPage = withLoginRedirect(function() {
    return (
        <Layout>
            <Header>
                <HeaderComponent />
            </Header>
            <Content>
                <DeviceList />
            </Content>
        </Layout>
    );
});
