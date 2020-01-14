import { ReminderViewPage } from './page-objects/reminderview.po';

describe('reminder view page', () => {
  let page: ReminderViewPage;
  const emptyReminderValues = ['', '', ''];
  const editReminderDefaultValues = ['Read Angular 5 blog', 'Shall do at 6 pm', ''];
  const editReminder = ['Read Angular 1 blog', 'Shall do at 10.30 pm', 'not-started'];

  beforeEach(async () => {
    page = await new ReminderViewPage();
  });

  it('should render take a reminder card', () => {
    page.navigateToReminderView();
    expect(page.isReminderPanelPresent()).toBeTruthy('<mat-expansion-panel> should exist');
    expect(page.isReminderPanelTitlePresent()).toBeTruthy('<mat-panel-title> should exist');
    page.getReminderPanel().click();
    expect(page.getReminderPanelTitleText()).toEqual('Take a reminder',
      '<mat-panel-title> should look like <mat-panel-title>Take a reminder</mat-panel-title>');
    expect(page.isReminderNameInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as title');
    expect(page.isReminderDescriptionInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as text');
    expect(page.isDoneButtonPresent()).toBeTruthy('Done button exists with Done text');
  });

  it('should create a Reminder', () => {
    page.navigateToReminderView();
    page.getReminderPanel().click();
    expect(page.getReminderPanelDefaultValues()).toEqual(emptyReminderValues, 'Default values for title and text should be empty');
    const newReminderValues = page.addReminderValues();
    expect(page.getReminderPanelDefaultValues()).toEqual(newReminderValues, 'Should be able to set values for note title and text');
    page.clickDoneButton();
  });

  it('should open edit reminder model on clicking a reminder', () => {
    page.navigateToReminderView();
    page.clickLastReminder();
    // tslint:disable-next-line:max-line-length
    expect(page.isEditReminderNameTitleInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as editReminderName');
    expect(page.isEditReminderDescriptionTextInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as editReminderDescription');
    expect(page.isEditReminderTypeInputBoxPresent()).toBeTruthy('Status select box should exist with name attribute as editStatus');
    expect(page.isSaveButtonPresent()).toBeTruthy('Save button exists with Save text');
    expect(page.getLastReminderTitle()).toBe(page.getMockReminder().reminderName,
      'Added reminder title should be shown in <mat-card-title> element on reminder.component.html');
  });

  it('should edit a Reminder', () => {
    page.navigateToReminderView();
    page.clickLastReminder();
    expect(page.isEditReminderNameTitleInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as editTitle');
    expect(page.isEditReminderDescriptionTextInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as editText');
    expect(page.isEditReminderTypeInputBoxPresent()).toBeTruthy('Status select box should exist with name attribute as editStatus');
    expect(page.isSaveButtonPresent()).toBeTruthy('Save button exists with Save text');
    // tslint:disable-next-line:max-line-length
    expect(page.getEditReminderDefaultValues()).toEqual(editReminderDefaultValues, 'Default values should be shown on edit reminder dialog');
    const editReminderValues = page.editReminderValues();
    expect(page.getEditReminderDefaultValues()).toEqual(editReminderValues, 'Should be able to set values for note title and text');
    page.clickSaveButton();
    expect(page.getLastReminderTitle()).toEqual(editReminder[0],
      'Edited note title should be shown in <mat-card-title> element on reminder.component.html');
  });

});
