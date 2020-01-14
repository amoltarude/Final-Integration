import { CategoryViewPage } from './page-objects/categoryview.po';

describe('category view page', () => {
  let page: CategoryViewPage;
  const emptyCategoryValues = ['', ''];
  const editCategoryDefaultValues = ['Read Angular 5 blog', 'Shall do at 6 pm', 'not-started'];
  const editCategory = ['Read Angular 1 blog', 'Shall do at 10.30 pm', 'not-started'];

  beforeEach(() => {
    page = new CategoryViewPage();
  });

  it('should render take a category card', () => {
    page.navigateToCategoryView();
    expect(page.isCategoryPanelPresent()).toBeTruthy('<mat-expansion-panel> should exist');
    expect(page.isCategoryPanelTitlePresent()).toBeTruthy('<mat-panel-title> should exist');
    page.getCategoryPanel().click();
    expect(page.getCategoryPanelTitleText()).toEqual('Take a category',
      '<mat-panel-title> should look like <mat-panel-title>Take a category</mat-panel-title>');
    expect(page.isCategoryNameInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as title');
    expect(page.isCategoryDescriptionInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as text');
    expect(page.isDoneButtonPresent()).toBeTruthy('Done button exists with Done text');
  });

  it('should create a Category', () => {
    page.navigateToCategoryView();
    page.getCategoryPanel().click();
    expect(page.getCategoryPanelDefaultValues()).toEqual(emptyCategoryValues, 'Default values for title and text should be empty');
    const newCategoryValues = page.addCategoryValues();
    expect(page.getCategoryPanelDefaultValues()).toEqual(newCategoryValues, 'Should be able to set values for note title and text');
    page.clickDoneButton();
  });

  it('should open edit category model on clicking a category', () => {
    page.navigateToCategoryView();
    page.clickLastCategory();
    // tslint:disable-next-line:max-line-length
    expect(page.isEditCategoryNameTitleInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as editReminderName');
    expect(page.isEditCategoryDescriptionTextInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as editReminderDescription');
    expect(page.isSaveButtonPresent()).toBeTruthy('Save button exists with Save text');
    expect(page.getLastCategoryTitle()).toBe(page.getMockCategory().categoryName,
      'Added reminder title should be shown in <mat-card-title> element on reminder.component.html');
  });

  it('should edit a Category', () => {
    page.navigateToCategoryView();
    page.clickLastCategory();
    expect(page.isEditCategoryNameTitleInputBoxPresent()).toBeTruthy('Title input box should exist with name attribute as editTitle');
    expect(page.isEditCategoryDescriptionTextInputBoxPresent()).toBeTruthy('Text input box should exist with name attribute as editText');
    expect(page.isSaveButtonPresent()).toBeTruthy('Save button exists with Save text');
    // tslint:disable-next-line:max-line-length
     expect(page.getEditCategoryDefaultValues()).toEqual(editCategoryDefaultValues, 'Default values should be shown on edit reminder dialog');
    const editReminderValues = page.editReminderValues();
    expect(page.getEditCategoryDefaultValues()).toEqual(editReminderValues, 'Should be able to set values for note title and text');
    page.clickSaveButton();
    expect(page.getLastCategoryTitle()).toEqual(editCategory[0],
      'Edited note title should be shown in <mat-card-title> element on reminder.component.html');
  });

});
