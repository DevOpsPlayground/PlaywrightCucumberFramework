import { Given, When, Then } from '@cucumber/cucumber'
import { Browser, Page, chromium, expect } from "@playwright/test"
import GlobalSQAPage from '../pages/globalSQAPage';
import LoginPage from '../pages/loginPage';
import SaucePage from '../pages/saucePage';

let page: Page
let browser: Browser
let globalSQAPage: GlobalSQAPage
let loginPage: LoginPage
let saucePage: SaucePage

