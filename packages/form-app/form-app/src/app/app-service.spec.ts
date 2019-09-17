import { DummyService } from './app-service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpRequest, HttpClient } from '@angular/common/http';
import { FormQLModule } from '@formql/core';

describe('Service: GetForm', () => {
    let backend: HttpTestingController;
    let service: DummyService;

    const mockContactInfo = {
        "layoutComponentName": "PlainLayoutComponent",
        "formName": "contactInfo",
        "class": "container",
        "dataSource": {
            "type": "GraphQL",
            "query": "{ contact(id: $id) { id firstName lastName email mobile addressLine1 addressLine2 addressCity addressPostCode } } ",
            "mutation": "mutation { updateContact(contact: ${contact}) { id: id firstName: firstName lastName: lastName email: email mobile: mobile addressPostCode:addressPostCode addressLine1:addressLine1 addressLine2:addressLine2 addressCity:addressCity  } }"
        },
        "pages": [{
            "structure": "12",
            "template": {
                "title": "header",
                "body": {
                    "gridTemplateColumns": "1fr 1fr",
                    "gridTemplateRows": "",
                    "gridTemplateAreas": "\"ID1_1 ID1_2\" \"ID2_1 ID2_2\""
                },
                "reRender": false
            },
            "sections": [{
                "components": [{
                    "schema": "contact.lastName",
                    "label": "Contact Info",
                    "componentName": "FormQLLabelComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 1,
                        "type": 1
                    },
                    "componentId": "0af1e87f-19fe-e6e0-80ca-f1d512b889ec",
                    "rules": {},
                    "value": null,
                    "style": {
                        "padding": "0px",
                        "margin": "10px",
                        "border-bottom": "3px solid",
                        "font-family": "Roboto,'Helvetica Neue',sans-serif"
                    }
                }, {
                    "schema": "contact.firstName",
                    "label": "First name",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 0,
                        "type": 2
                    },
                    "componentId": "f3ba55e9-20b3-db67-2099-22a9108bcd47",
                    "rules": {
                        "readonly": {
                            "key": "readonly",
                            "condition": "  ",
                            "value": null
                        },
                        "required": {
                            "key": "required",
                            "condition": "true",
                            "value": null,
                            "errorMessage": "Please enter first name"
                        }
                    },
                    "value": null
                }, {
                    "schema": "contact.lastName",
                    "label": "Last Name",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_2",
                        "index": 0,
                        "type": 2
                    },
                    "componentId": "0af1e87f-29fe-e6e0-80ca-f1d512b889ec",
                    "rules": {
                        "required": {
                            "key": "required",
                            "condition": "true",
                            "value": null
                        }
                    },
                    "value": null
                }, {
                    "schema": "contact.mobile",
                    "label": "Mobile",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID2_2",
                        "index": 0,
                        "type": 2
                    },
                    "componentId": "bb22abb9-0fd0-fa7b-ff0a-50e2c2031970",
                    "conditions": {},
                    "rules": {},
                    "value": null
                }, {
                    "schema": "contact.email",
                    "label": "Email",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID2_1",
                        "index": 0,
                        "type": 2
                    },
                    "componentId": "776bd62b-b83a-9b67-43b9-03cf7daa2dcb",
                    "rules": {},
                    "value": null
                }, {
                    "componentId": "842329ce-9118-8865-f71e-f8f223150a1f",
                    "label": "Add comments",
                    "componentName": "FormQLMatCheckboxComponent",
                    "position": {
                        "id": "ID3_1",
                        "index": 0,
                        "type": 2
                    },
                    "rules": {},
                    "value": null,
                    "schema": "contact.addComments"
                }, {
                    "componentId": "ba201941-0126-0427-4d73-f1c2677aec04",
                    "label": "Comments",
                    "componentName": "FormQLMatTextareaComponent",
                    "position": {
                        "id": "ID4_1",
                        "index": 0,
                        "type": 2
                    },
                    "rules": {
                        "hidden": {
                            "key": "hidden",
                            "condition": "typeof contact !== 'object' || (contact && contact.addComments !== true)",
                            "value": null
                        }
                    },
                    "value": null,
                    "schema": "contact.comments"
                }],
                "position": {
                    "id": "ID1_1",
                    "index": 0
                },
                "sectionId": "1d3fcbe3-a029-ca5e-4791-9666155fff0f",
                "headerStyle": {
                    "font-size": "1.2rem",
                    "border-bottom": "2px solid #3F51B5",
                    "margin-bottom": "10px",
                    "color": "#3F51B5"
                },
                "template": {
                    "title": "header",
                    "header": {
                        "hidden": false,
                        "style": null,
                        "gridTemplateColumns": "1fr",
                        "gridTemplateAreas": "\"ID1_1\""
                    },
                    "body": {
                        "hidden": false,
                        "gridTemplateColumns": "1fr 1fr",
                        "style": null,
                        "gridTemplateRows": "",
                        "gridTemplateAreas": "\"ID1_1 ID1_2\" \"ID2_1 ID2_2\" \"ID3_1 ID3_1\" \"ID4_1 ID4_1\""
                    },
                    "reRender": false
                },
                "sectionName": "Contact Information"
            }, {
                "components": [{
                    "schema": "contact.lastName",
                    "label": "Address",
                    "componentName": "FormQLLabelComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 2,
                        "type": 1
                    },
                    "componentId": "0af1e87f-09fe-e6e0-80ca-f1d512b889ec",
                    "rules": {},
                    "value": null,
                    "style": {
                        "padding": "0px",
                        "margin": "10px",
                        "border-bottom": "3px solid",
                        "font-family": "Roboto,'Helvetica Neue',sans-serif"
                    }
                }, {
                    "schema": "contact.addressLine1",
                    "label": "Line 1",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 0,
                        "type": 2
                    },
                    "componentId": "f3bb55e9-20b3-db67-2099-22a9108bcd47",
                    "rules": {
                        "hidden": {
                            "key": "hidden",
                            "condition": "contact.fistName === ''",
                            "value": null
                        },
                        "readonly": {
                            "key": "readonly",
                            "condition": "contact.fistName === ''",
                            "value": null
                        },
                        "required": {
                            "key": "required",
                            "condition": "contact.fistName === ''",
                            "value": null,
                            "errorMessage": "bbbbbbbbbbbb"
                        }
                    },
                    "configuration": {
                        "test": "test"
                    },
                    "value": null
                }, {
                    "schema": "contact.addressLine2",
                    "label": "Line 2",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 3,
                        "type": 2
                    },
                    "componentId": "0af1e87f-09fe-e9e0-80ca-f1d512b889ec",
                    "rules": {},
                    "value": null
                }, {
                    "schema": "contact.addressCity",
                    "label": "City",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 4,
                        "type": 2
                    },
                    "componentId": "bb22abb9-0fd0-f27b-ff0a-50e2c2031970",
                    "conditions": {},
                    "rules": {},
                    "value": null
                }, {
                    "schema": "contact.addressPostCode",
                    "label": "Postcode",
                    "componentName": "FormQLMatFormFieldComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_1",
                        "index": 5,
                        "type": 2
                    },
                    "componentId": "776bd62b-b83a-ab67-43b9-03cf7daa2dcb",
                    "rules": {},
                    "value": null
                }],
                "position": {
                    "id": "ID1_2",
                    "index": 0
                },
                "sectionId": "2d3fcbe3-a029-ca5e-4791-9666155fff0f",
                "headerStyle": {
                    "font-size": "1.2rem",
                    "border-bottom": "2px solid #3F51B5",
                    "margin-bottom": "10px",
                    "color": "#3F51B5"
                },
                "template": {
                    "title": "header",
                    "header": {
                        "gridTemplateColumns": "1fr",
                        "gridTemplateAreas": "\"ID1_1\""
                    },
                    "body": {
                        "gridTemplateColumns": "1fr",
                        "gridTemplateRows": "1fr",
                        "gridTemplateAreas": "\"ID1_1\""
                    },
                    "reRender": false
                },
                "sectionName": "Address Information"
            }, {
                "components": [{
                    "label": "Save",
                    "componentName": "FormQLMatButtonComponent",
                    "type": "text",
                    "order": 1,
                    "position": {
                        "id": "ID1_3",
                        "index": 0,
                        "type": 2
                    },
                    "componentId": "786bd72b-b83a-9b67-43b9-03cf7daa2dcb",
                    "rules": {},
                    "action": {
                        "key": "save"
                    },
                    "value": null,
                    "style": {
                        "float": "right"
                    }
                }],
                "structure": "12",
                "position": {
                    "id": "ID2_2",
                    "index": 0
                },
                "sectionId": "3d3fcbe3-a029-ca5e-4791-9666155fff0f",
                "headerStyle": null,
                "template": {
                    "title": "header",
                    "header": {
                        "gridTemplateColumns": "1fr",
                        "gridTemplateAreas": "\"ID1_1\"",
                        "hidden": false
                    },
                    "body": {
                        "gridTemplateColumns": "1fr",
                        "gridTemplateRows": "1fr",
                        "gridTemplateAreas": "\"ID1_3\""
                    },
                    "reRender": false
                },
                "sectionName": ""
            }],
            "pageId": "f83c2ca3-1259-aa95-e817-61321a04713d"
        }]
    }
    const mockData = { "contact": { "firstName": "asds", "lastName": "asdasd" } };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, FormQLModule],
            providers: [
                DummyService,
            ]
        });
        service = TestBed.get(DummyService);
        backend = TestBed.get(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (_backend: HttpTestingController) => {
        _backend.verify()
    }))

    test('should create an instance sucessfully', () => {
        expect(service).toBeDefined()
    })

    test('should call getForm(contactInfo) api and return the form', () => {
        let actualDataReturned = {};

        service.getForm('contactInfo').subscribe(data => actualDataReturned = data);

        backend.expectOne((req: HttpRequest<any>) => {
            return req.url === 'assets/api/contactInfo.json'
                && req.method === 'GET'
        }, 'GET form from assets/api/contactInfo.json')
            .flush(mockContactInfo)

        expect(actualDataReturned).toEqual(mockContactInfo);
    });

    test('should call getData(123) api and return the data', () => {
        let actualDataReturned = {};

        localStorage.setItem('123', JSON.stringify(mockData));

        service.getData(null, ['123']).subscribe(data => actualDataReturned = data);

        expect(actualDataReturned).toEqual(mockData);
    });

});