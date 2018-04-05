import * as at_controls from '../../components/js/at_controls';
var $ = require("jquery")

export function page_load() {
    console.log("Loading page newitems");
    at_controls.textlabelrow(
        "label", 5, ["Count", "Perctg.", "Wastage", "Rate", "Sizing Rate"], "",
        "id", false
    ).appendTo("#section-top-left #warp #grid-1 table");

    at_controls.textlabelrow(
        "label", 3, ["Weight", "Warp Cost", "Warp Sizing Cost"], "",
        "id", false
    ).appendTo("#section-top-left #warp #grid-2 table");

    $("#section-top-left #warp #grid-add").on('click', (e) => {
        e.preventDefault()
        $("#section-top-left #warp #grid-2 table input[id^='total']").closest("tr").remove();
        at_controls.textlabelrow(
            "text", 5, [],
            at_controls.link_button("", "white", "danger", "minus-square",
                (e) => {
                    var index = $("#section-top-left #warp #grid-1 table tr").index(e.target.closest("tr"));
                    $("#section-top-left #warp #grid-1 table tr:eq(" + index + ")").remove();
                    $("#section-top-left #warp #grid-2 table tr:eq(" + index + ")").remove();
                }
            ),
            "id", false
        ).appendTo("#section-top-left #warp #grid-1 table");

        at_controls.textlabelrow(
            "text", 3, [],
            "",
            "id", true
        ).appendTo("#section-top-left #warp #grid-2 table");
    })

    $("#section-top-left #warp #grid-add").click();

    $("#section-top-left #warp #grid-reset").on("click", (e) => {
        e.preventDefault()
        $("#section-top-left #warp #grid-2 table input[id^='total']").closest("tr").remove();
    })

    $("#section-top-left #warp #grid-calc").on("click", (e) => {
        e.preventDefault()
        $("#section-top-left #warp #grid-2 table input[id^='total']").closest("tr").remove();
        at_controls.textlabelrow(
            "text", 3, [],
            "",
            "total", true
        ).appendTo("#section-top-left #warp #grid-2 table");
    })


    at_controls.textlabelrow(
        "label", 4, ["Count", "Perctg.", "Wastage", "Rate"], "",
        "id", false
    ).appendTo("#section-top-left #weft #grid-1 table");

    at_controls.textlabelrow(
        "label", 2, ["Weight", "Weft Cost"], "",
        "id", false
    ).appendTo("#section-top-left #weft #grid-2 table");

    $("#section-top-left #weft #grid-add").on('click', (e) => {
        e.preventDefault()
        $("#section-top-left #weft #grid-2 table input[id^='total']").closest("tr").remove();
        at_controls.textlabelrow(
            "text", 4, [],
            at_controls.link_button("", "white", "warning", "minus-square",
                (e) => {
                    var index = $("#section-top-left #weft #grid-1 table tr").index(e.target.closest("tr"));
                    $("#section-top-left #weft #grid-1 table tr:eq(" + index + ")").remove();
                    $("#section-top-left #weft #grid-2 table tr:eq(" + index + ")").remove();
                }
            ),
            "id", false
        ).appendTo("#section-top-left #weft #grid-1 table");

        at_controls.textlabelrow(
            "text", 2, [],
            "",
            "ad", true
        ).appendTo("#section-top-left #weft #grid-2 table");
    })

    $("#section-top-left #weft #grid-add").click();

    $("#section-top-left #weft #grid-reset").on("click", (e) => {
        e.preventDefault();
        $("#section-top-left #weft #grid-2 table input[id^='total']").closest("tr").remove();
    })

    $("#section-top-left #weft #grid-calc").on("click", (e) => {
        e.preventDefault();
        $("#section-top-left #weft #grid-2 table input[id^='total']").closest("tr").remove();
        at_controls.textlabelrow(
            "text", 2, [],
            "",
            "total", true
        ).appendTo("#section-top-left #weft #grid-2 table");
    })

    at_controls.textlabelrow(
        "label", 4, ["Kg/bag", "Cone/Bag", "Part", "No of Beam"], "",
        "id", false
    ).appendTo("#section-bottom-1 #grid-1 table");

    at_controls.textlabelrow(
        "label", 7, ["Kg/Cone", "Total Meger", "Sizing Meger", "Tara", "No. of Bags", "Total Cut", "Cut on Beam"], "",
        "id", false
    ).appendTo("#section-bottom-1 #grid-2 table");

    $("#section-bottom-1 #grid-add").on('click', (e) => {
        e.preventDefault()
        at_controls.textlabelrow(
            "text", 4, [],
            at_controls.link_button("", "white", "warning", "minus-square",
                (e) => {
                    var index = $("#section-bottom-1 #grid-1 table tr").index(e.target.closest("tr"));
                    $("#section-bottom-1 #grid-1 table tr:eq(" + index + ")").remove();
                    $("#section-bottom-1 #grid-2 table tr:eq(" + index + ")").remove();
                }
            ),
            "id", false
        ).appendTo("#section-bottom-1 #grid-1 table");

        at_controls.textlabelrow(
            "text", 7, [],
            "",
            "id", true
        ).appendTo("#section-bottom-1 #grid-2 table");
    })

    $("#section-bottom-1 #grid-add").click();

    $("#section-bottom-1 #grid-reset").on("click", (e) => {
        e.preventDefault();
    })

    $("#section-bottom-2 #grid-reset").on("click", (e) => {
        e.preventDefault();
    })

    $('[data-toggle="tooltip"]').tooltip();
}