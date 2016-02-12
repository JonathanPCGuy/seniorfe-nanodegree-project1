var myapp = myapp || {};

// is this how to do namespace?

myapp.FormViewModel = function () {
    var self = this;

    self.formPages = $('section.single-page');

    self.lastPage = 2;
    self.currentPage = ko.observable(0);

    self.changeFormPage = function (data, event) {
        var optionClicked = $(event.target).attr('class');
        if (optionClicked === 'previous' && self.currentPage() > 0) {
            self.currentPage(self.currentPage() - 1);
        }
        else if (optionClicked === 'next' && self.currentPage() < self.lastPage) {
            self.currentPage(self.currentPage() + 1);
        }
    };

    self.updateView = ko.computed(function () {
        // assumption: jQuery panels in order
        // may not always be the case! will need to use other stuff to fix things down
        // but for this homework it is ok
        var visiblePage = self.currentPage();
        $(self.formPages[visiblePage]).removeClass('hidden');
        self.formPages.each(function (index, value) {
            // each doesn't need closure?
            if (visiblePage !== index) {
                $(value).addClass('hidden');
            }
        });
    });

    self.stepText = ko.computed(function () {
        // probably not good to embed the actual raw text here?
        if (self.currentPage() === 0) {
            return 'Shipping Info';
        }
        else if (self.currentPage() === 1) {
            return 'Billing Info';
        }
        else {
            return 'Order Verification';
        }
    });

    self.getRawBarWidth = ko.computed(function() {
        return Math.round((self.currentPage() / (self.lastPage + 1) * 100));
    });

    self.getBarWidth = ko.computed(function () {
        var value = self.getRawBarWidth();
            return value.toString();
    });

    self.getBarWidthWithPercentage = ko.computed(function() {
        return self.getRawBarWidth() + "%";
    });
    // is it possible to specify a data-bind in html
    // but not declare it as a variable in js?
};

$(function () {
    // lazyness
    var formLabels = $('label');
    formLabels.toggleClass('col-md-9');
    formLabels.toggleClass('col-md-offset-3');
    ko.applyBindings(new myapp.FormViewModel());
});