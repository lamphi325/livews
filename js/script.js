$(document).ready(function () {
    var x_left, x_right, y_top, y_bottom;
    var m_x, m_y;
    var resize_top,
        resize_el,
        resize_bottom,
        resize_right,
        resize_topleft,
        resize_topright,
        resize_bottomleft,
        resize_bottomright,
        move;

    // create control
    var controlStick = document.getElementsByClassName("control-stick")[0];
    var retangle;
    var startX, startY;
    var bgLesson = document.getElementsByClassName("bg-lesson")[0];

    var addControl = function (e) {
        if (!document.getElementById("retangle")) {
            retangle = document.createElement("div");
            retangle.id = "retangle";
            retangle.style.position = "absolute";
            retangle.style.top = startY + "px";
            retangle.style.left = startX + "px";
            retangle.style.border = "1px dashed #7B40E5";
            retangle.style.width = "0px";
            retangle.style.height = "0px";
            controlStick.appendChild(retangle);
        }

        let width = parseInt(e.x - startX),
            height = parseInt(e.y - startY);

        if (width < 0) {
            retangle.style.left = parseInt(e.x) + "px";
            retangle.style.width = Math.abs(parseInt(e.x - startX)) + "px";
        }
        if (height < 0) {
            retangle.style.top = parseInt(e.y) + "px";
            retangle.style.height = Math.abs(parseInt(e.y - startY)) + "px";
        }
        if (width > 0) {
            retangle.style.width = width + "px";
        }
        if (height > 0) {
            retangle.style.height = height + "px";
        }
    }

    var appendControl = function (e) {
        let retang = document.getElementById("retangle");
        if (retang) {
            let width = retang.style.width,
                height = retang.style.height;
            let time = (new Date).getTime();

            var text = `<div class="selectboxes">
                <div class="dropdown">
                    <a data-toggle="dropdown">
                        <i class="fab fa-adn"></i>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item">
                            <a><span>Đổi dạng tương tác</span>
                                <i class="fas fa-angle-down"></i>
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <a><i class="fas fa-clone"></i>
                                <span>Nhân bản</span>
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <a><i class="fas fa-trash-alt"></i>
                                <span>Xóa</span>
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <a><i class="far fa-arrow-to-top"></i>
                                <span>Lên trên cùng</span>
                            </a>
                        </li>
                        <li class="dropdown-item">
                            <a>
                                <i class="far fa-arrow-from-top"></i>
                                <span>Xuống dưới cùng</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="move" id="move${time}"></div>
            </div>
            <div class="toolbox" style="width: ${width}; height: ${height}; background-color: antiquewhite;">
                <div class="top" id="top${time}"></div>
                <div class="right" id="right${time}"></div>
                <div class="bottom" id="bottom${time}"></div>
                <div class="left" id="left${time}"></div>
                <div class="topleft" id="topleft${time}"></div>
                <div class="topright" id="topright${time}"></div>
                <div class="bottomright" id="bottomright${time}"></div>
                <div class="bottomleft" id="bottomleft${time}"></div>
                <div class="textbox" draggable="false" contenteditable="true" id="textbox${time}"></div>
            </div>`

            let el = document.createElement("div");
            el.id = "my-box" + time;
            el.classList.add("my-box");
            el.style.top = retang.style.top;
            el.style.left = (parseInt(retang.style.left) - 35) + "px";
            bgLesson.appendChild(el);
            el.innerHTML = text;

            resize_top = document.getElementById("top" + time);
            resize_el = document.getElementById("left" + time);
            resize_bottom = document.getElementById("bottom" + time);
            resize_right = document.getElementById("right" + time);
            resize_topleft = document.getElementById("topleft" + time);
            resize_topright = document.getElementById("topright" + time);
            resize_bottomleft = document.getElementById("bottomleft" + time);
            resize_bottomright = document.getElementById("bottomright" + time);
            move = document.getElementById("move" + time);

            resize_el.addEventListener("mousedown", function (e) {
                x_left = e.x;
                resize_el = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeLeft, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeLeft, false);
            }, false);

            resize_right.addEventListener("mousedown", function (e) {
                x_right = e.x;
                resize_right = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeRight, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeRight, false);
            }, false);

            resize_top.addEventListener("mousedown", function (e) {
                y_top = e.y;
                resize_top = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeTop, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeTop, false);
            }, false);

            resize_bottom.addEventListener("mousedown", function (e) {
                y_bottom = e.y;
                resize_bottom = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeBottom, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeBottom, false);
            }, false);

            resize_topleft.addEventListener("mousedown", function (e) {
                x_left = e.x;
                y_top = e.y;
                resize_topleft = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeTopLeft, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeTopLeft, false);
            }, false);

            resize_topright.addEventListener("mousedown", function (e) {
                x_right = e.x;
                y_top = e.y;
                resize_topright = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeTopRight, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeTopRight, false);
            }, false);

            resize_bottomleft.addEventListener("mousedown", function (e) {
                x_left = e.x;
                y_bottom = e.y;
                resize_bottomleft = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeBottomLeft, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeBottomLeft, false);
            }, false);

            resize_bottomright.addEventListener("mousedown", function (e) {
                x_right = e.x;
                y_bottom = e.y;
                resize_bottomright = document.getElementById(e.path[0].id);
                resize_top = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", resizeBottomRight, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", resizeBottomRight, false);
            }, false);

            move.addEventListener("mousedown", function (e) {
                m_x = e.x;
                m_y = e.y;
                move = document.getElementById(e.path[0].id);
                document.addEventListener("mousemove", moveBox, false);
            }, false);
            document.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", moveBox, false);
            }, false);

            controlStick.removeChild(retangle);
        }
    }

    controlStick.addEventListener("mousedown", function (e) {
        e.preventDefault();
        startX = e.x;
        startY = e.y;

        document.addEventListener("mousemove", addControl, false);
    }, false);
    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", addControl, false);
        appendControl();
    }, false);

    // resize left
    var resizeLeft = function (e) {
        var parent = resize_el.parentNode;
        var root = parent.parentNode;
        var dx = x_left - e.x;
        x_left = e.x;
        var width = getComputedStyle(parent, '').width;

        parent.style.width = (parseInt(width) + dx) + "px";
        root.style.left = (parseInt(x_left)) + "px";
    }

    // var resize_el = document.getElementsByClassName("left")[0];
    // resize_el.addEventListener("mousedown", function (e) {
    //     x_left = e.x;
    //     document.addEventListener("mousemove", resizeLeft, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeLeft, false);
    // }, false);

    // resize right
    var resizeRight = function (e) {
        var parent = resize_right.parentNode;
        var dx = e.x - x_right;
        x_right = e.x;

        parent.style.width = (parseInt(getComputedStyle(parent, '').width) + dx) + "px";
    }

    // var resize_right = document.getElementsByClassName("right")[0];
    // resize_right.addEventListener("mousedown", function (e) {
    //     x_right = e.x;
    //     document.addEventListener("mousemove", resizeRight, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeRight, false);
    // }, false);

    // resize top
    var resizeTop = function (e) {
        var parent = resize_top.parentNode;
        var root = parent.parentNode;
        var dy = y_top - e.y;
        y_top = e.y;
        parent.style.height = (parseInt(getComputedStyle(parent, '').height) + dy) + "px";
        root.style.top = parseInt(y_top) + "px";
    }

    // var resize_top = document.getElementsByClassName("top")[0];
    // resize_top.addEventListener("mousedown", function (e) {
    //     y_top = e.y;
    //     document.addEventListener("mousemove", resizeTop, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeTop, false);
    // }, false);

    // resize bottom
    var resizeBottom = function (e) {
        var parent = resize_bottom.parentNode;
        var dy = e.y - y_bottom;
        y_bottom = e.y;
        parent.style.height = (parseInt(getComputedStyle(parent, '').height) + dy) + "px";
    }

    // var resize_bottom = document.getElementsByClassName("bottom")[0];
    // resize_bottom.addEventListener("mousedown", function (e) {
    //     y_bottom = e.y;
    //     document.addEventListener("mousemove", resizeBottom, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeBottom, false);
    // }, false);

    // resize topleft
    var resizeTopLeft = function (e) {
        var parent = resize_top.parentNode;
        var root = parent.parentNode;
        var dx = x_left - e.x;
        var dy = y_top - e.y;
        x_left = e.x;
        y_top = e.y;
        parent.style.width = (parseInt(getComputedStyle(parent, '').width) + dx) + "px";
        root.style.left = parseInt(x_left) + "px";
        parent.style.height = (parseInt(getComputedStyle(parent, '').height) + dy) + "px";
        root.style.top = parseInt(y_top) + "px";
    }

    // var resize_topleft = document.getElementsByClassName("topleft")[0];
    // resize_topleft.addEventListener("mousedown", function (e) {
    //     x_left = e.x;
    //     y_top = e.y;
    //     document.addEventListener("mousemove", resizeTopLeft, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeTopLeft, false);
    // }, false);

    // resize topright
    var resizeTopRight = function (e) {
        var parent = resize_top.parentNode;
        var root = parent.parentNode;
        var dx = e.x - x_right;
        var dy = y_top - e.y;
        x_right = e.x;
        y_top = e.y;
        parent.style.width = (parseInt(getComputedStyle(parent, '').width) + dx) + "px";
        parent.style.height = (parseInt(getComputedStyle(parent, '').height) + dy) + "px";
        root.style.top = parseInt(y_top) + "px";
    }

    // var resize_topright = document.getElementsByClassName("topright")[0];
    // resize_topright.addEventListener("mousedown", function (e) {
    //     x_right = e.x;
    //     y_top = e.y;
    //     document.addEventListener("mousemove", resizeTopRight, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeTopRight, false);
    // }, false);

    // resize bottomleft
    var resizeBottomLeft = function (e) {
        var parent = resize_top.parentNode;
        var root = parent.parentNode;
        var dx = x_left - e.x;
        var dy = e.y - y_bottom;
        x_left = e.x;
        y_bottom = e.y;
        parent.style.width = (parseInt(getComputedStyle(parent, '').width) + dx) + "px";
        root.style.left = parseInt(x_left) + "px";
        parent.style.height = (parseInt(getComputedStyle(parent, '').height) + dy) + "px";
    }

    // var resize_bottomleft = document.getElementsByClassName("bottomleft")[0];
    // resize_bottomleft.addEventListener("mousedown", function (e) {
    //     x_left = e.x;
    //     y_bottom = e.y;
    //     document.addEventListener("mousemove", resizeBottomLeft, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeBottomLeft, false);
    // }, false);

    // resize bottomleft
    var resizeBottomRight = function (e) {
        var parent = resize_top.parentNode;
        var dx = e.x - x_right;
        var dy = e.y - y_bottom;
        x_right = e.x;
        y_bottom = e.y;
        parent.style.width = (parseInt(getComputedStyle(parent, '').width) + dx) + "px";
        parent.style.height = (parseInt(getComputedStyle(parent, '').height) + dy) + "px";
    }

    // var resize_bottomright = document.getElementsByClassName("bottomright")[0];
    // resize_bottomright.addEventListener("mousedown", function (e) {
    //     x_right = e.x;
    //     y_bottom = e.y;
    //     document.addEventListener("mousemove", resizeBottomRight, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", resizeBottomRight, false);
    // }, false);

    // move
    var moveBox = function (e) {
        var parent = move.parentNode;
        var root = parent.parentNode;
        var width = parseInt(getComputedStyle(root, '').width),
            height = parseInt(getComputedStyle(root, '').height);
        m_x = e.x;
        m_y = e.y;
        root.style.top = parseInt(m_y - (height / 2)) + "px";
        root.style.left = parseInt(m_x - (35 / 2)) + "px";
    }

    // var move = document.getElementsByClassName("move")[0];
    // move.addEventListener("mousedown", function (e) {
    //     m_x = e.x;
    //     m_y = e.y;
    //     document.addEventListener("mousemove", moveBox, false);
    // }, false);
    // document.addEventListener("mouseup", function () {
    //     document.removeEventListener("mousemove", moveBox, false);
    // }, false);
})