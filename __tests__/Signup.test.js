import 'react-native';
import React from 'react';
import Signup from '../js/Signup';
import renderer from 'react-test-renderer';

test('Signup snapShot', () => {
  const snap = renderer.create(
    <Signup />
  ).toJSON();
expect(snap).toMatchSnapshot();
});

test('Email in state should be an empty string', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();

expect(SignComp.state.email).toBeFalsy();
});

test('Password in state should be an empty string', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();

expect(SignComp.state.password).toBeFalsy();
});

test('loginPage in state should be false', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();

expect(SignComp.state.loginPage).toBeFalsy();
});

test('signupPage in state should be true', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();

expect(SignComp.state.signupPage).toBeTruthy();
});

test('loginPage in state should be true when _loginPage is called', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();
SignComp._loginPage();
expect(SignComp.state.loginPage).toBeTruthy();
});

test('loginPage in state should be true when _loginPage is called', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();
SignComp._loginPage();
expect(SignComp.state.signupPage).toBeFalsy();
});

test('signupPage in state should be true when _signupPage is called', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();
SignComp._signup();
expect(SignComp.state.signupPage).toBeTruthy();
});

test('loginPage in state should be false when _signupPage is called', () => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();
SignComp._signup();
expect(SignComp.state.loginPage).toBeFalsy();
});

test('_signup() should return an object', (done) => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();
  expect.assertions(1);
  return SignComp._signin().then((data) => {
    expect(typeof data).toEqual('object');
    done();
  });
});

test('signupPage in state should be true when _loginPage is called', (done) => {
  const SignComp = renderer.create(
    <Signup />
  ).getInstance();
  expect.assertions(1);
  return SignComp._signin().then((data) => {
    expect(data.response).toBeTruthy();
    done();
  });
});
