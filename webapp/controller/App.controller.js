sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/ui/unified/DateRange',
	'sap/ui/unified/Calendar'
], function(Controller, Fragment, Button, Dialog, DateRange, Calendar) {
	"use strict";
	return Controller.extend("ZDashBoard.controller.App", {

		onInit: function(oEvent) {

			var oController = this;
			var oView = oController.getView();

			var $oValueHelp = $.Deferred();
			oController.getValueHelp($oValueHelp);
			$.when($oValueHelp).done(function(oResponseData) {
				if (oResponseData) {
					//debugger;
					var oJSONModel = new sap.ui.model.json.JSONModel(oResponseData);
					oController.getView().setModel(oJSONModel, "oViewValueHelp");
				}
			});
			var $oInsightData = $.Deferred();
			oController.getInsightData($oInsightData);
			$.when($oInsightData).done(function(oResponseData) {
				if (oResponseData) {
					debugger;
					var oColumnModel = {
						"column": {
							"sap.app": {
								"type": "card"
							},
							"sap.card": {
								"type": "Analytical",
								"header": {
									"type": "Numeric",
									"data": {
										"json": {
											"number": "",
											"unit": "K",
											"trend": "Up",
											"state": "Success",
											"target": {
												"number": 100,
												"unit": "K"
											},
											"deviation": {
												"number": 34.7
											},
											"details": ""
										}
									},
									"title": "Active Users ",
									"mainIndicator": {
										"number": "{number}",
										"state": "{state}",
										"range": {
											"Critical": [],
											"Good": []
										}
									},
									"details": "{details}"
								},
								"content": {
									"chartType": "Column",
									"legend": {
										"visible": true,
										"position": "Bottom",
										"alignment": "Left"
									},
									"plotArea": {
										"dataLabel": {
											"visible": true
										},
										"categoryAxisText": {
											"visible": true
										},
										"valueAxisText": {
											"visible": true
										}
									},
									"title": {
										"text": "Count by period",
										"visible": true,
										"alignment": "Left"
									},
									"measureAxis": "valueAxis",
									"dimensionAxis": "categoryAxis",
									"data": {
										"json": {
											"list": []
										},
										"path": "/list"
									},
									"dimensions": [{
										"label": "Month",
										"value": "{Yr_Mnth}"
									}],
									"measures": [{
										"label": "ActiveUsers",
										"value": "{Usr_Cnt}"
									}]
								}
							}
						}
					};

					var oDonutModel = {
							"donut1": {
								"sap.app": {
									"type": "card"
								},
								"sap.card": {
									"type": "Analytical",
									"header": {
										"type": "Numeric",
										"data": {
											"json": {
												"number": "",
												"unit": "K",
												"trend": "Up",
												"state": "Success",
												"target": {
													"number": 100,
													"unit": "K"
												},
												"deviation": {
													"number": 34.7
												},
												"details": ""
											}
										},
										"title": "Users Devices",
										"mainIndicator": {
											"number": "{number}",
											"state": "{state}",
											"range": {
												"Critical": [],
												"Good": []
											}
										},
										"details": "{details}"

									},
									"content": {
										"chartType": "Donut",
										"legend": {
											"visible": true,
											"position": "bottom",
											"alignment": "left"
										},
										"plotArea": {
											"dataLabel": {
												"visible": true,
												"showTotal": true
											}
										},
										"title": {
											"text": "Count by Period ",
											"visible": true,
											"alignment": "Left"
										},
										"measureAxis": "size",
										"dimensionAxis": "color",
										"data": {
											"json": {
												"donutData": []
											},
											"path": "/donutData"
										},
										"dimensions": [{
											"label": "Device Type",
											"value": "{CONSUMER_TYP}"
										}],
										"measures": [{
											"label": "Device Count",
											"value": "{DEV_CNT}"
										}]
									}
								}
							}
						};
						/***Active user count statrs here **/

					if (oResponseData[0].NAVTO_Actv_Usr_Cnt && oResponseData[0].NAVTO_Actv_Usr_Cnt.results) {
						//oColumnModel.column["sap.card"].content.dimensions[0].label = "Month";
						//	oColumnModel.column["sap.card"].content.dimensions[0].value = "Yr_Mnth";
						//	oColumnModel.column["sap.card"].content.measures[0].label = "active";
						//	oColumnModel.column["sap.card"].content.measures[0].value = "Usr_Cnt";
						oColumnModel.column["sap.card"].content.data.json.list = oResponseData[0].NAVTO_Actv_Usr_Cnt.results;
						var oJSONModel = new sap.ui.model.json.JSONModel(oColumnModel);
						oController.getView().setModel(oJSONModel, "oViewActiveUsers");
					}

					/***Active user count ends here **/

					/***Device type count statrs here **/

					if (oResponseData[0].NAVTO_DEV_TYP && oResponseData[0].NAVTO_DEV_TYP.results) {

					/*	oDonutModel.donut1["sap.card"].content.dimensions[0].label = "Device Type";
						oDonutModel.donut1["sap.card"].content.dimensions[0].value = "{CONSUMER_TYP}";
						oDonutModel.donut1["sap.card"].content.measures[0].label = "Device Count";
						oDonutModel.donut1["sap.card"].content.measures[0].value = "{DEV_CNT}";*/
						oDonutModel.donut1["sap.card"].content.data.json.donutData = oResponseData[0].NAVTO_DEV_TYP.results;
					/*	oDonutModel.column["sap.card"].content.chartType = "Donut";*/

						var oJSONModel = new sap.ui.model.json.JSONModel(oDonutModel);
						oController.getView().setModel(oJSONModel, "oViewDeviceType");
					}

					/***Device type count ends here **/
				}
			});
			/***comment for tom demo*******/
			/*var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrameBar");
			oVizFrame.setVizProperties({
				title: {
					visible: false
				}
			});
			var oVizFramePie = this.oVizFrame = this.getView().byId("oVizFramePie");
			oVizFramePie.setVizProperties({
				title: {
					visible: false
				},
				plotArea: {
					dataLabel: {
						visible: true
					}
				}
			});*/
		},
		valueHelpChange: function(oEvent) {
			//	debugger;
			var oSelectedKey = oEvent.oSource.getSelectedKey();
			var oValue = oEvent.getParameters().value;
		},
		/*	valueHelpScnChange:function(){
					debugger;
			},*/
		getValueHelp: function($oValueHelp) {
			debugger;
			var oAppModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZFIORI_INSIGHT_DASHBOARD_SRV");
			oAppModel.read("/Fiori_appsSet", {
				async: false,
				success: function(oData, response) {
					if (oData && oData.results && oData.results.length > 0) {
						$oValueHelp.resolve(oData.results);
					}
				},
				error: function(oData, response) {
					$oValueHelp.resolve("");
					console.log("Issue happened while initiating VIM model");
				}
			});
		},
		getInsightData: function($oInsightData) {
			var oAppModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZFIORI_INSIGHT_DASHBOARD_SRV");
			oAppModel.read(
				"/Fiori_Insight_InputSet?$filter=( Frm_Date eq '20190602' and Frm_Date eq '20190802' and TECH_SRV_NAME eq 'HCM_TIMESHEET_MAN_SRV' )&$expand=NAVTO_DEV_TYP,NAVTO_Actv_Usr_Cnt", {
					async: false,
					success: function(oData, response) {
						debugger;
						if (oData && oData.results.length > 0) {
							$oInsightData.resolve(oData.results);
						}
					},
					error: function(oData, response) {
						$oInsightData.resolve("");
						console.log("Issue happened while initiating VIM model");
					}
				});
		},
		handleCalendarSelect: function(oEvent) {
			//debugger;
			var oController = this;
			var oCalendar = oEvent.getSource();
			var oInputID = this.byId("calanderDate");
			var oStartDate = oCalendar.getSelectedDates()[0].mProperties.startDate;
			var oEndDate = oCalendar.getSelectedDates()[0].mProperties.endDate;
			if (oStartDate) {
				this.getView().getModel("oViewValueHelp").oData.calenderStartDate = oStartDate;
				oStartDate = oController.GetFormattedDate(oStartDate);
			}
			if (oEndDate) {
				this.getView().getModel("oViewValueHelp").oData.calenderEndDate = oEndDate;
				oEndDate = oController.GetFormattedDate(oEndDate);
			}
			if (oStartDate && oEndDate) {
				oInputID.setValue(oStartDate + "  " + "to" + "  " + oEndDate);
			} else if (oStartDate) {
				oInputID.setValue(oStartDate);
			} else if (oEndDate) {
				oInputID.setValue(oStartDate);
			}
			if (oStartDate || oEndDate) {
				oInputID.setValue(oStartDate + "  " + "to" + "  " + oEndDate);
			}
			//this._updateText(oCalendar.getSelectedDates()[0]);
		},
		GetFormattedDate: function(Date) {
			var month = Date.getMonth() + 1;
			var day = Date.getDate();
			var year = Date.getFullYear();
			return day + "/" + month + "/" + year;
		},
		handleWeekNumberSelect: function(oEvt) {
			//debugger;
		},
		handleSelectThisWeek: function(oEvent) {
			this._selectWeekInterval(6);
		},
		handleSelectWorkWeek: function(oEvent) {
			this._selectWeekInterval(4);
		},
		handleWeekNumberSelect: function(oEvent) {
			var oDateRange = oEvent.getParameter("weekDays");
			var iWeekNumber = oEvent.getParameter("weekNumber");
			if (iWeekNumber % 5 === 0) {
				oEvent.preventDefault();
				MessageToast.show("You are not allowed to select this calendar week!");
			} else {
				this._updateText(oDateRange);
			}
		},
		_selectWeekInterval: function(iDays) {
			var oCurrent = new Date(); // get current date
			var iWeekstart = oCurrent.getDate() - oCurrent.getDay() + 1;
			var iWeekend = iWeekstart + iDays; // end day is the first day + 6
			var oMonday = new Date(oCurrent.setDate(iWeekstart));
			var oSunday = new Date(oCurrent.setDate(iWeekend));
			var oCalendar = this.byId("calendar");
			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({
				startDate: oMonday,
				endDate: oSunday
			}));
			this._updateText(oCalendar.getSelectedDates()[0]);
		},
		handleValueHelp: function(oEvent) {
			//debugger;
			var sInputValue = oEvent.getSource().getValue();
			this.inputId = oEvent.getSource().getId();
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"ZDashBoard.fragments.Dialog",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}
			this._valueHelpDialog.open(this.inputId);
		},
		DialogOK: function() {
			debugger;
		/*	var oInputID = this.byId("calanderDate");
			var oStartDate = this.getView().getModel("oViewValueHelp").oData.calenderStartDate;
			var oEndDate = this.getView().getModel("oViewValueHelp").oData.calenderEndDate;
			if (!oStartDate || !oEndDate) {
				oInputID.setValueState("Error");
			} else if (oStartDate.getTime() > oEndDate.getTime()) {
				oInputID.setValueState("Error");
			} else {
				oInputID.setValueState("None");
			}*/
			this._valueHelpDialog.close();
		},
		closeDialog: function() {
			/*var oInputID = this.byId("calanderDate");
			var oStartDate = this.getView().getModel("oViewValueHelp").oData.calenderStartDate;
			var oEndDate = this.getView().getModel("oViewValueHelp").oData.calenderEndDate;
			if (!oStartDate || !oEndDate) {
				oInputID.setValueState("Error");
			} else if (oStartDate.getTime() > oEndDate.getTime()) {
				oInputID.setValueState("Error");
			} else {
				oInputID.setValueState("None");
			}*/
			this._valueHelpDialog.close();
		}
	});
});