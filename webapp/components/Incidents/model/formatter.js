sap.ui.define([], function () {
	"use strict";

	return {
		src: function (value) {
			if (value != undefined) {
				return 'https://davidk-srv.cfapps.us10.hana.ondemand.com/incident/IncidentPhotos(${value})/image';
			} else {
				return "";
			}
		},
		state: function (value) {
			if (value == "critical") {
				return "Error";
			}
			return "Success";
		}
	};
});