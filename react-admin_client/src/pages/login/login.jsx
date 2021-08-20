import React, {Component} from 'react';
import './login.less'
/*
登陸的路由組件
 */
class Login extends Component {
    render() {
        return (
            <div className={'login'}>
                <header className={'login-header'}>
                    <img src={'logo'} alt={'logo'}/>
                    <h1>React项目：后台管理項目</h1>
                </header>
                <section className={'login-content'}>
                    <h2>用户登陆</h2>
                    <form></form>
                </section>
            </div>
        );
    }
}

export default Login;