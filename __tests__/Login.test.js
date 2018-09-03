import 'react-native';
import React from 'react';
import Login from '../js/Login';
import renderer from 'react-test-renderer';

test('Login snapShot', () => {
  const snap = renderer.create(
    <Login />
  ).toJSON();
expect(snap).toMatchSnapshot();
});

test('Email in state should be an empty string', () => {
  const LoginComp = renderer.create(
    <Login />
  ).getInstance();

expect(LoginComp.state.email).toBe('');
});

test('Password in state should be an empty string', () => {
  const LoginComp = renderer.create(
    <Login />
  ).getInstance();

expect(LoginComp.state.password).toBe('');
});

test('loginPage in state should be true', () => {
  const LoginComp = renderer.create(
    <Login />
  ).getInstance();

expect(LoginComp.state.loginPage).toBeTruthy();
});

test('signupPage in state should be false', () => {
  const LoginComp = renderer.create(
    <Login />
  ).getInstance();

expect(LoginComp.state.signupPage).toBeFalsy();
});

test('signupPage in state should be true when _signupPage() is called', () => {
  const LoginComp = renderer.create(
    <Login />
  ).getInstance();
LoginComp._signup();
expect(LoginComp.state.signupPage).toBeTruthy();
});

test('loginPage in state should be false when _signupPage() is called', () => {
  const LoginComp = renderer.create(
    <Login />
  ).getInstance();
LoginComp._signup();
expect(LoginComp.state.loginPage).toBeFalsy();
});

// test('_Login() promise should return an object', () => {
//   const LoginComp = renderer.create(
//     <Login />
//   ).getInstance();
//   expect.assertions(1);
//   return LoginComp._submit().then((response) => {
//     expect(typeof response).toEqual('object');
//   });
// });

// test('response.data to be truthy', () => {
//   const LoginComp = renderer.create(
//     <Login />
//   ).getInstance();
//   return LoginComp._signup().then((response) => {
//     expect(response.data).toBeTruthy();
//   });
// });

// test('signupPage in state should be true when _signupPage is called', () => {
//   const LoginComp = renderer.create(
//     <Login />
//   ).getInstance();
// expect(typeof LoginComp.styles).toEqual('object');
// });
