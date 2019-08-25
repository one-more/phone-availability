import * as React from 'react';
import { Content, Layout, LoginForm } from '~/modules/app';

export function LoginPage(): JSX.Element {
    return (
        <Layout>
            <Content>
                <LoginForm />
            </Content>
        </Layout>
    );
}
