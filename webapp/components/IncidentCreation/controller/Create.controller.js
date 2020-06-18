sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	//const DESTINATION = "/destinations/Incidents_CF/incident/";
	const DESTINATION = "http://localhost:8081/https://davidk-srv.cfapps.us10.hana.ondemand.com/incident/";

	var that = null;
	var pictureObj = null;
	const initialValues = {
		title: "",
		description: "",
		category_code: "security",
		priority_code: "low",
		assignedIndividual_ID: "067460c5-196c-4783-9563-ede797399da8"
	};
	return Controller.extend("com.garageseries.Incident_CF.controller.Create", {

		onInit: function () {
			var oModel = new JSONModel(initialValues);

			this.getView().setModel(oModel);
			that = this;

		},
		onNavButtonPress: function () {
			this.getOwnerComponent()
				.getRouter()
				.navTo("RouteMain", {});
		},
		onAfterRendering() {
			var oID = this.createId("picPreview");
			//handle the event when a new picture is uploaded or a new pictures was taken using the camera
			document
				.getElementById(this.createId("file"))
				.addEventListener("change", function () {

					//check if there is an image
					if (this.files && this.files[0]) {

						var previewPic = document.getElementById(oID);
						var reader = new FileReader();
						reader.onload = function (e) {
							previewPic.src = e.target.result;
							pictureObj = e.target.result
						};

						reader.readAsDataURL(this.files[0]);

					}
				});
		},
		onTakePicture: function () {
			//trigger click event for the input field to open camera
			var image = document.getElementById(this.createId("file"));
			image.click();
		},
		onSelectionChange: function (event) {
			var data = that.getView().getModel().getData();
			if (
				event
				.getSource()
				.getId()
				.indexOf("category") > 0
			) {
				data.category_code = event.getSource().getProperty("selectedKey");
			} else {
				data.priority_code = event.getSource().getProperty("selectedKey");
			}
			that
				.getView()
				.getModel()
				.setData(data);
		}.bind(this),
		onInput: function (event) {
			var data = event.getSource().getValue();
			if (event.getSource().getId().indexOf("title") > 0) {
				if (data.length > 0) {
					this.getView().byId("title").setValueState("None");
					this.getView().byId("title").setValueStateText("");
				} else {
					this.getView().byId("title").setValueState("Error");
					this.getView().byId("title").setValueStateText("Please enter a value");
				}
			}
			if (event.getSource().getId().indexOf("description") > 0) {
				if (data.length > 0) {
					this.getView().byId("description").setValueState("None");
					this.getView().byId("description").setValueStateText("");
				} else {
					this.getView().byId("description").setValueState("Error");
					this.getView().byId("description").setValueStateText("Please enter a value");
				}
			}
		},
		onSave: function () {

			var data = this.getView()
				.getModel()
				.getData();
			if (data.title == "") {
				this.getView().byId("title").setValueState("Error");
				this.getView().byId("title").setValueStateText("Please enter a value");
			}
			if (data.description == "") {
				this.getView().byId("description").setValueState("Error");
				this.getView().byId("description").setValueStateText("Please enter a value");
			}
			if (data.title != "" && data.description != "") {
				// TODO: set model to initial values
				var settings = {
					async: true,
					url: DESTINATION + "/SafetyIncidents",
					method: "POST",
					headers: {
						"content-type": "application/json",
						"APIKey": "OEg7evHR3qkgBZDjgAyo3HZl7guhkaGN1",
						"X-Requested-With": "XMLHttpRequest"
					},
					processData: false,
					data: JSON.stringify(data)
				};
				$.ajax(settings)
					.done(
						function (response) {

							var msg = "Incident successfully created";
							MessageToast.show(msg);
							//reset the from model to initial values to empty the fields
							this.getView().getModel().setData({
								title: "",
								description: "",
								category_code: "security",
								priority_code: "low",
								assignedIndividual_ID: "067460c5-196c-4783-9563-ede797399da8"
							});
							// create picture instance
							this.createPicture(response);

							//update the home page request with the new value
							/*this.updateReportsModel();
							//clear picture

							//nativate back to home page
							this.getOwnerComponent()
								.getRouter()
								.navTo("RouteMain", {});*/
						}.bind(this)
					)
					.fail(function () {
						MessageToast.show("Error: Please Try Again!");
					});
			}

		},
		createPicture: function (response) {
			var data = {
				safetyIncident_ID: response.ID,
				imageType: "image/png"
			}
			var settings = {
				async: true,
				crossDomain: true,
				url: DESTINATION + "/IncidentPhotos",
				"method": "POST",
				"timeout": 0,
				"headers": {
					"content-type": "application/json",
					"APIKey": "OEg7evHR3qkgBZDjgAyo3HZl7guhkaGN1",
					"X-Requested-With": "XMLHttpRequest"
				},
				"data": JSON.stringify(data),
			};

			$.ajax(settings).done(function (response) {
				if (pictureObj) {
					this.uploadPicture(response);
				}
			}.bind(this));
		},
		uploadPicture: function (response) {
			var id = response.ID
			var data = this.dataURItoBlob(pictureObj);

			var xhr = new XMLHttpRequest();
			// xhr.withCredentials = true; does not work with CORSAnywhere
			xhr.withCredentials = false;

			xhr.addEventListener("readystatechange", function () {
				if (this.readyState === 4) {
					// console.log(this.responseText);
					document.getElementById(that.createId("picPreview")).src = "";
					// pictureObj = null;
					$("#" + that.createId("file")).attr("value", "");
					pictureObj = null;
				}

			});

			xhr.open("PUT", DESTINATION + "/IncidentPhotos(" + id + ")/image");
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.setRequestHeader("APIKey", "OEg7evHR3qkgBZDjgAyo3HZl7guhkaGN1");

			xhr.send(data);

		},
		dataURItoBlob: function (dataURI) {
			var byteString;
			var mimeString;

			// separate the mimetype and byte string
			if (dataURI.split(',')[0].indexOf('base64') >= 0)
				byteString = atob(dataURI.split(',')[1]);
			else
				byteString = unescape(dataURI.split(',')[1]);

			// separate out the mime component
			mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

			// write the bytes of the string to a typed array
			var ia = new Uint8Array(byteString.length);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}

			return new Blob([ia], {
				type: mimeString
			});
		}
	});

});