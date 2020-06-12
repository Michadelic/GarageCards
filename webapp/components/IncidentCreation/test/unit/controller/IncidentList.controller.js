/*global QUnit*/

sap.ui.define([
	"com/garageseries/Incident_CF/controller/IncidentList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("IncidentList Controller");

	QUnit.test("I should test the IncidentList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});