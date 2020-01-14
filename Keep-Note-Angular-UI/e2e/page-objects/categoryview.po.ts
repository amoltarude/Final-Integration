import { browser, by, element, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class CategoryViewPage {
  // navigate to note view page
  navigateToCategoryView() {
    return browser.get('/category-dashboard/view/categoryview');
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
  getEditCategoryViewComponent(): ElementFinder {
    return element(by.tagName('app-edit-category-view'));
  }
  // get note panel title element
  getCategoryPanelTitle(): ElementFinder {
    return element(by.css('mat-panel-title'));
  }
  // check note panel title element is present or not
  isCategoryPanelTitlePresent(): promise.Promise<boolean> {
    return this.getCategoryPanelTitle().isPresent();
  }
  // get note panel title element value
  getCategoryPanelTitleText() {
    return this.getCategoryPanelTitle().getText();
  }
  // get complete note panel
  getCategoryPanel(): ElementFinder {
    return element(by.css('mat-expansion-panel'));
  }
  // check note panel is present or not
  isCategoryPanelPresent(): promise.Promise<boolean> {
    return this.getCategoryPanel().isPresent();
  }
  // get reminderName input box
  getCategoryNameInputBox(): ElementFinder {
    return element(by.name('categoryName'));
  }
  // check title input box is present or not
  isCategoryNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getCategoryNameInputBox().isPresent();
  }
  // get reminderType input box
  getCategoryDescriptionInputBox(): ElementFinder {
    return element(by.name('categoryDescription'));
  }
  // check text input box is present or not
  isCategoryDescriptionInputBoxPresent(): promise.Promise<boolean> {
    return this.getCategoryDescriptionInputBox().isPresent();
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
  getCategoryPanelDefaultValues(): any {
    let inputTitle, inputText;
    inputTitle = this.getCategoryNameInputBox().getAttribute('value');
    inputText = this.getCategoryDescriptionInputBox().getAttribute('value');
    return Promise.all([inputTitle, inputText]).then( (values) => {
      return values;
    });
  }
  // get note data
  getMockCategory(): any {
    const category: any = { categoryName: 'Read Angular 5 blog', categoryDescription : 'Shall do at 6 pm'};
    return category;
  }
  // set input fileds values with mock data
  addCategoryValues(): any {
    const category: any = this.getMockCategory();
    this.getCategoryNameInputBox().sendKeys(category.categoryName);
    this.getCategoryDescriptionInputBox().sendKeys(category.categoryDescription);
    return Object.keys(category).map(key => category[key]);
  }

  // get all notes
  getAllCategory(): ElementArrayFinder {
    return element.all(by.css('mat-card'));
  }
  // get last note
  getLastCategory(): ElementFinder {
    return this.getAllCategory().last();
  }

  // get last note
  getLastCategoryTitle(): promise.Promise<string> {
    return this.getAllCategory().last().element(by.css('mat-card-title')).getText();
  }
  // click on note
  clickLastCategory(): promise.Promise<void> {
    return this.getLastCategory().click();
  }

  // get title input box
  getEditCategoryNameInputBox(): ElementFinder {
    return element(by.name('editCategoryName'));
  }
  // check title input box is present or ot
  isEditCategoryNameTitleInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditCategoryNameInputBox().isPresent();
  }
  // get text input box
  getEditCategoryDescriptionTextInputBox(): ElementFinder {
    return element(by.name('editCategoryDescription'));
  }
  // check text input box is present or not
  isEditCategoryDescriptionTextInputBoxPresent(): promise.Promise<boolean> {
    return this.getEditCategoryDescriptionTextInputBox().isPresent();
  }
  // get status select box
//   getEditReminderTypeInputBox(): ElementFinder {
//     return element(by.name('editReminderType'));
//   }
  // check text input box is present or not
//   isEditReminderTypeInputBoxPresent(): promise.Promise<boolean> {
//     return this.getEditReminderTypeInputBox().isPresent();
//   }
  // get button
  getSaveButton(): ElementFinder {
    return this.getEditCategoryViewComponent().element(by.buttonText('Save'));
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
  getEditCategoryDefaultValues(): any {
    let inputEditTitle, inputEditText;
    inputEditTitle = this.getEditCategoryNameInputBox().getAttribute('value');
    inputEditText = this.getEditCategoryDescriptionTextInputBox().getAttribute('value');
    // inputEditStatus = this.getEditReminderTypeInputBox().getAttribute('value');
    return Promise.all([inputEditTitle, inputEditText]).then( (values) => {
      return values;
    });
  }
  // get note data
  getEditMockCategory(): any {
// tslint:disable-next-line:label-position

    const category: any = { categoryName: 'Read Angular 1 blog', categoryDescription : 'Shall do at 10.30 pm'};
    return category;
  }
  // set input fileds values with mock data
  editReminderValues(): any {
    const category: any = this.getEditMockCategory();
    this.getEditCategoryNameInputBox().clear();
    this.getEditCategoryNameInputBox().sendKeys(category.categoryName);
    this.getEditCategoryDescriptionTextInputBox().clear();
    this.getEditCategoryDescriptionTextInputBox().sendKeys(category.categoryDescription);
    // this.getEditRemindeeDescriptionTextInputBox().clear();
    // this.getEditRemindeeDescriptionTextInputBox().sendKeys(reminder.reminderDescription);
    return Object.keys(category).map(key => category[key]);
  }

}
