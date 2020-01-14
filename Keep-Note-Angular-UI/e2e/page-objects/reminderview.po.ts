import { browser, by, element, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class ReminderViewPage {
  // navigate to note view page
  navigateToReminderView() {
    return browser.get('/reminder-dashboard/view/reminderview');
  }
  // to pause browser
  pauseBrowser(port) {
    browser.pause(port);
  }
  // app component
  getAppComponent(): ElementFinder {
    return element(by.tagName('app-root'));
  }
  // app component
  getEditReminderViewComponent(): ElementFinder {
    return element(by.tagName('app-edit-reminder-view'));
  }
  // get note panel title element
  getReminderPanelTitle(): ElementFinder {
    return element(by.css('mat-panel-title'));
  }
  // check note panel title element is present or not
  isReminderPanelTitlePresent(): promise.Promise<boolean> {
    return this.getReminderPanelTitle().isPresent();
  }
  // get note panel title element value
  getReminderPanelTitleText() {
    return this.getReminderPanelTitle().getText();
  }
  // get complete note panel
  getReminderPanel(): ElementFinder {
    return element(by.css('mat-expansion-panel'));
  }
  // check note panel is present or not
  isReminderPanelPresent(): promise.Promise<boolean> {
    return this.getReminderPanel().isPresent();
  }
  // get reminderName input box
  getReminderNameInputBox(): ElementFinder {
    return element(by.name('reminderName'));
  }
  // check title input box is present or not
  isReminderNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getReminderNameInputBox().isPresent();
  }
  // get reminderType input box
  getReminderDescriptionInputBox(): ElementFinder {
    return element(by.name('reminderDescription'));
  }
  // check text input box is present or not
  isReminderDescriptionInputBoxPresent(): promise.Promise<boolean> {
    return this.getReminderDescriptionInputBox().isPresent();
  }
    // get reminderType input box
  getReminderTypeInputBox(): ElementFinder {
    return element(by.name('reminderType'));
  }
  // check text input box is present or not
  isReminderTypeInputBoxPresent(): promise.Promise<boolean> {
    return this.getReminderTypeInputBox().isPresent();
  }
  // get button
  getDoneButton(): ElementFinder {
    return this.getAppComponent().element(by.buttonText('Done'));
  }
  // check button is present or not
  isDoneButtonPresent(): promise.Promise<boolean> {
    return this.getDoneButton().isPresent();
  }
  // click done button
  clickDoneButton(): promise.Promise<void> {
    return this.getDoneButton().click();
  }
  // get note panel default values
  async getReminderPanelDefaultValues(): Promise<any> {
    let inputTitle, inputText, inputType;
    inputTitle = await this.getReminderNameInputBox().getAttribute('value');
    inputText = await this.getReminderDescriptionInputBox().getAttribute('value');
    inputType = await this.getReminderTypeInputBox().getAttribute('value');
    return Promise.all([inputTitle, inputText, inputType]).then( (values) => {
      return values;
    });
  }
  // get note data
  getMockReminder(): any {
    const reminder: any = { reminderName: 'Read Angular 5 blog', reminderDescription : 'Shall do at 6 pm', reminderType: 'not-started'};
    return reminder;
  }
  // set input fileds values with mock data
  async addReminderValues(): Promise<any> {
    const reminder: any = this.getMockReminder();
    await this.getReminderNameInputBox().sendKeys(reminder.reminderName);
    await this.getReminderDescriptionInputBox().sendKeys(reminder.reminderDescription);
    await this.getEditReminderTypeInputBox().sendKeys(reminder.reminderType);
    return Object.keys(reminder).map(key => reminder[key]);
  }

  // get all notes
  getAllReminder(): ElementArrayFinder {
    return element.all(by.css('mat-card'));
  }
  // get last note
  getLastReminder(): ElementFinder {
    return this.getAllReminder().last();
  }

  // get last note
  getLastReminderTitle(): promise.Promise<string> {
    return this.getAllReminder().last().element(by.css('mat-card-title')).getText();
  }
  // click on note
  clickLastReminder(): promise.Promise<void> {
    return this.getLastReminder().click();
  }

  // get title input box
  getEditReminderNameInputBox(): ElementFinder {
    return element(by.name('editReminderName'));
  }
  // check title input box is present or ot
  isEditReminderNameTitleInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditReminderNameInputBox().isPresent();
  }
  // get text input box
  getEditRemindeeDescriptionTextInputBox(): ElementFinder {
    return element(by.name('editReminderDescription'));
  }
  // check text input box is present or not
  isEditReminderDescriptionTextInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditRemindeeDescriptionTextInputBox().isPresent();
  }
  // get status select box
  getEditReminderTypeInputBox(): ElementFinder {
    return element(by.name('editReminderType'));
  }
  // check text input box is present or not
  isEditReminderTypeInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditReminderTypeInputBox().isPresent();
  }
  // get button
  getSaveButton(): ElementFinder {
    return this.getEditReminderViewComponent().element(by.buttonText('Save'));
  }
  // check button is present or not
  isSaveButtonPresent(): promise.Promise<boolean> {
    return this.getSaveButton().isPresent();
  }
  // click save button
  clickSaveButton(): promise.Promise<void> {
    return this.getSaveButton().click();
  }
  // get edit note model default values
  async getEditReminderDefaultValues(): Promise<any> {
    let inputEditTitle, inputEditText, inputEditStatus;
    inputEditTitle = await this.getEditReminderNameInputBox().getAttribute('value');
    inputEditText = await this.getEditRemindeeDescriptionTextInputBox().getAttribute('value');
    inputEditStatus = await this.getEditReminderTypeInputBox().getAttribute('value');
    return Promise.all([inputEditTitle, inputEditText, inputEditStatus]).then( (values) => {
      return values;
    });
  }
  // get note data
  getEditMockReminder(): any {
// tslint:disable-next-line:label-position

    const reminder: any = { reminderName: 'Read Angular 1 blog', reminderDescription : 'Shall do at 10.30 pm', reminderType: 'not-started'};
    return reminder;
  }
  // set input fileds values with mock data
  async editReminderValues(): Promise<any> {
    const reminder: any = this.getEditMockReminder();
    await this.getEditReminderNameInputBox().clear();
    await this.getEditReminderNameInputBox().sendKeys(reminder.reminderName);
    await this.getEditRemindeeDescriptionTextInputBox().clear();
    await this.getEditRemindeeDescriptionTextInputBox().sendKeys(reminder.reminderDescription);
    await this.getEditReminderTypeInputBox().clear();
    await this.getEditReminderTypeInputBox().sendKeys(reminder.reminderType);
    return Object.keys(reminder).map(key => reminder[key]);
  }

}
