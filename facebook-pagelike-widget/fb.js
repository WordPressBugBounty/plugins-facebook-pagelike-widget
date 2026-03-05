(function($) {
    "use strict";

    /**
     * SECTION 1: Loader Logic
     * Handles the FB loader visibility on page load
     */
    $(window).on('load', function() {
        $('.fb_loader').fadeOut('fast');
    });

    // Fallback: Hide loader after 5 seconds if window load is slow
    setTimeout(function() {
        if ($('.fb_loader').is(':visible')) {
            $('.fb_loader').hide();
        }
    }, 5000);

    /**
     * SECTION 2: Widget Toggle Logic
     * Handles showing/hiding the width field in the WordPress Admin
     */
    function toggleWidthField(context) {
        $(context).find('.adapt-click').each(function() {
            var isChecked = $(this).is(':checked');
            $(this).closest('form').find('.width_option').toggle(!isChecked);
        });
    }

    $(document).ready(function() {
        // 1. Initial run for widgets already on the page
        toggleWidthField(document);

        // 2. Event Delegation for user checkbox changes
        $(document).on('change', '.adapt-click', function() {
            toggleWidthField($(this).closest('form'));
        });

        // 3. WordPress AJAX triggers (Runs after a widget is saved or added)
        $(document).on('widget-added widget-updated', function(event, widget) {
            toggleWidthField(widget);
        });
    });

})(jQuery);