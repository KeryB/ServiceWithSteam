(function(namespace, $) {
	"use strict";

	var AppForm = function() {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function() {
			o.initialize();
		});

	};
	var p = AppForm.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function() {
		// Init events
		this._enableEvents();
		
		this._initRadioAndCheckbox();
		this._initFloatingLabels();
	};
	
	// =========================================================================
	// EVENTS
	// =========================================================================

	// events
	p._enableEvents = function () {
		var o = this;

		// Link submit function
		$('[data-submit="form"]').on('click', function (e) {
			e.preventDefault();
			var formId = $(e.currentTarget).attr('href');
			$(formId).submit();
		});
		
		// Init textarea autosize
		$('textarea.autosize').on('focus', function () {
			$(this).autosize({append: ''});
		});
	};
	
	// =========================================================================
	// RADIO AND CHECKBOX LISTENERS
	// =========================================================================

	p._initRadioAndCheckbox = function () {
		// Add a span class the styled checkboxes and radio buttons for correct styling
		$('.checkbox-styled input, .radio-styled input').each(function () {
			if ($(this).next('span').length === 0) {
				$(this).after('<span></span>');
			}
		});
	};
	
	// =========================================================================
	// FLOATING LABELS
	// =========================================================================

	p._initFloatingLabels = function () {
		var o = this;

		$('.floating-label .form-control').on('keyup change', function (e) {
			var input = $(e.currentTarget);

			if ($.trim(input.val()) !== '') {
				input.addClass('dirty').removeClass('static');
			} else {
				input.removeClass('dirty').removeClass('static');
			}
		});

		$('.floating-label .form-control').each(function () {
			var input = $(this);

			if ($.trim(input.val()) !== '') {
				input.addClass('static').addClass('dirty');
			}
		});

		$('.form-horizontal .form-control').each(function () {
			$(this).after('<div class="form-control-line"></div>');
		});
	};
	
	// =========================================================================
	// DEFINE NAMESPACE
	// =========================================================================

	window.materialadmin.AppForm = new AppForm;
}(window.materialadmin, jQuery)); // pass in (namespace, jQuery):
