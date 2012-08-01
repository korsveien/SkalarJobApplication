var fja = fja || {};

fja.menu = (function () {
    var _active_page_id = "",
        _active_menuitem_element = "";


    return {
        changeActivePage: _change_active_page,
        changeActiveMenuItem: _change_menuitem_to_active,
        bindMenuItems: _bind_menu_items
    };


    function _change_active_page(pageID) {
        fja.utils.assertString(pageID);

        var pageToActivate = document.getElementById(pageID),
            pageToDeactivate = document.getElementById(_active_page_id);

        if (_active_page_id === pageID) {
            return;
        } else if (pageToDeactivate !== null) {
            _fade_out_page(pageToDeactivate, pageToActivate);
        } else {
            _fade_in_page(pageToActivate);
        }

        _active_page_id = pageID;
    }

    function _bind_menu_items() {
        var menuItems = fja.utils.getElementsByClass("menuItem"),
            index, elementID, divIdToBind;

        for (index in menuItems) {
            elementID = menuItems[index].id;
            divIdToBind = elementID.replace("Item", "");

            menuItems[index].onclick = (function (menuItemID, pageElementID) {
                return function() {
                    fja.menu.changeActiveMenuItem(menuItemID);
                    fja.menu.changeActivePage(pageElementID);
                };
            })(elementID, divIdToBind);
        }
    }

    function _change_menuitem_to_active(menuElementID) {
        var menuElement = document.getElementById(menuElementID);
        
        if (_active_menuitem_element !== "")
            _active_menuitem_element.className = "menuItem";

        menuElement.className = "activeMenuItem";
        _active_menuitem_element = menuElement;
    }

    function _fade_out_page(pageToFadeOut, pageToFadeIn) {
        var opacityStep = 2,
            fadeTimeInMs = 50;

        if (pageToFadeOut.style.opacity === "") {
            pageToFadeOut.style.opacity = 1;
        } else if (pageToFadeOut.style.opacity <= 0) {
            pageToFadeOut.style.display = "none";
            _fade_in_page(pageToFadeIn);
            return;
        }

        // Workaround javascript bug by multiplying by 10 and deviding by 10
        pageToFadeOut.style.opacity = ((pageToFadeOut.style.opacity * 10) - opacityStep) / 10;

        setTimeout(function() {
            _fade_out_page(pageToFadeOut, pageToFadeIn);
        }, fadeTimeInMs);
    }

    function _fade_in_page(pageToFadeIn) {
        var opacityStep = 2,
            fadeTimeInMs = 50;

        if (pageToFadeIn.style.display !== "block")
            pageToFadeIn.style.display = "block";
        
        if (pageToFadeIn.style.opacity === "") {
            pageToFadeIn.style.opacity = 0;
        } else if (pageToFadeIn.style.opacity >= 1) {
            return;
        }

        // Workaround javascript bug by multiplying by 10 and deviding by 10
        pageToFadeIn.style.opacity = ((pageToFadeIn.style.opacity * 10) + opacityStep) / 10;

        setTimeout(function() {
            _fade_in_page(pageToFadeIn);
        }, fadeTimeInMs);
    }
})();
