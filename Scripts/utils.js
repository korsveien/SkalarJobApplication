var fja = fja || {};

fja.utils = (function () {
    var numberException = "Invalid argument: not a number",
        stringException = "Invalid argument: not a string",
        functionException = "Invalid argument: not a function";


    return {
        assertString: _assert_string,
        assertNumber: _assert_number,
        assertFunction: _assert_function,
        getElementsByClass: _get_elements_by_class
    };


    function _assert_string(string) {
        if (typeof string !== "string")
            throw { name: stringException };
    }

    function _assert_number(number) {
        if (typeof number !== "number" || isNaN(number))
		    throw { name: numberException };
    }

    function _assert_function(func) {
        if (typeof func !== "function")
            throw { name: functionException };
    }

    function _get_elements_by_class(className) {
        var allHtmlTags = document.getElementsByTagName("*"),
            requestedClassElements = [],
            index,
            len = allHtmlTags.length;

        _assert_string(className);

        for (index = 0; index < len; index++) {
            if (allHtmlTags[index].className === className) {
                requestedClassElements.push(allHtmlTags[index]);
            }
        }

        return requestedClassElements;
    }
}());
