/**
 * Created by GTR on 2017/9/12.
 */
import React, { Component } from "react";
import "jquery";
import "jquery-ui";
import { slider } from "jquery-ui/ui/widgets/slider";
import $ from "jquery";
import jQuery from "jquery";
import SliderImage from "../../images/social/slider1.png";
import "./timeLineCSS.css";

export default class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginTime: "2017",
      endTime: "2017"
    };
  }

  /* shouldComponentUpdate(){

       // console.log(this.state.value);
        return true;
    }*/

  changeTime(timeline) {
    this.props.getTime(timeline);
  }

  componentDidMount() {
    let _this = this;
    let beginTime = "2018";
    let endTime = "2018";

    let time = null;
    /*日期选择*/
    let currentYear, currentMonth, currentDay;

    function getEndDay(year, month) {
      let Day = new Date(year, month, 0);
      return Day.getDate();
    }
    function yearInit(min, max) {
      let arr = [];
      for (let i = min, n = 0; i <= max; i++, n++) {
        arr.push({
          value: i.toString(),
          text: i + "年"
        });
      }
      return arr;
    }

    function monthInit(year) {
      let arr = [];
      for (let i = 0; i < 2 && year <= thisYear; i++, year++) {
        for (let n = 1; n <= 12; n++) {
          arr.push({
            value: n.toString(),
            text: year + "年" + (n < 10 ? "0" + n : n) + "月"
          });
        }
      }
      return arr;
    }
    function dayInit(year, month) {
      let arr = [];
      let max = getEndDay(year, month);
      // month = +month;
      for (let i = 1; i <= max; i++) {
        arr.push({
          value: i.toString(),
          text:
            year +
            "年" +
            (+month < 10 ? "0" + +month : month) +
            "月" +
            (i < 10 ? "0" + i : i) +
            "日"
        });
      }
      if (month != "12" || year < thisYear) {
        if (month == "12") {
          year++;
          month = 1;
        } else month++;
        max = getEndDay(year, month);
        for (let i = 1; i <= max; i++) {
          arr.push({
            value: i.toString(),
            text:
              year +
              "年" +
              (month < 10 ? "0" + month : month) +
              "月" +
              (i < 10 ? "0" + i : i) +
              "日"
          });
        }
      }
      return arr;
    }

    let date = new Date();
    currentYear = date.getFullYear();
    let thisYear = date.getFullYear();
    // yearInitFun=new yearInit(2000, currentYear);
    currentMonth = date.getMonth() + 1;
    currentDay = date.getDate();
    // dayInit(currentYear, currentMonth, currentDay);
    $("#yearNum").text(currentYear);

    let scrollThing = document.getElementById("timeLine-year");
    $(".year,.month,.day").click(function() {
      let id = $(this).attr("id");
      $(".year,.month,.day").removeClass("active");
      $(this).addClass("active");
      if (id != "") {
        $(".time-line").hide();
        $("#timeLine-" + id).fadeIn("slow");
        if (id == "month") {
          //生成月的时间轴
          $("#timeLine-" + id)
            .empty()
            .selectToUISlider({
              labels: 1,
              unitWidth: 4,
              data: new monthInit(currentYear),
              selector: [+currentMonth - 1, +currentMonth]
            });
          let month_selected = $("#timeLine-month ol")[0].children[
            +currentMonth - 1
          ];
          $(month_selected).addClass("active active_serious");
        } else if (id == "day") {
          //生成日的时间轴
          $("#timeLine-" + id)
            .empty()
            .selectToUISlider({
              labels: 1,
              unitWidth: 4,
              data: new dayInit(currentYear, currentMonth),
              selector: [0, 1]
            });
          $("#timeLine-day ol li:first").addClass("active active_serious");
        }

        //添加滚动条事件
        // scrollThing = document.getElementById('timeLine-' + id);
        // scrollMethod(scrollThing);
      }
    });

    /*        $('.time-line').scroll(function () {
            // console.log(scrollThing.scrollLeft+scrollThing.clientWidth-scrollThing.scrollWidth);
            //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
            if (scrollThing.scrollLeft + scrollThing.clientWidth + 1 > scrollThing.scrollWidth) {
                // addLi();
                // console.log("OK");
                if (scrollThing.id == 'timeLine-month') {
                    $scope.allMonth.push.apply($scope.allMonth, monthInit(currentYear + 1));
                    // console.log($scope.allMonth);
                    $scope.$apply();

                }
            }
        });*/

    // function scrollMethod(scrollThing) {
    //     let stepSize = 200, //每滚动一格鼠标，移动多少距离
    //         body = document.body,
    //         scrollLeft = -1,
    //         scrollThingWidth = scrollThing.clientWidth,
    //         ready = false;
    //
    //     //添加鼠标滚轮事件
    //     if (scrollThing.addEventListener) {
    //         scrollThing.addEventListener('mousewheel', scroll, false);
    //         scrollThing.addEventListener('DOMMouseScroll', scroll, false); //针对firefox
    //     } else {
    //         scrollThing.attachEvent('onmousewheel', scroll); //针对老ie浏览器
    //     }
    //
    //     //处理mousewheel事件的信息
    //     function scroll(event) {
    //         //第一次滚动需要获取当前滚动位置
    //         if (!ready) {
    //             scrollLeft = scrollThing.scrollLeft + body.scrollLeft;
    //             ready = true;
    //         }
    //         //firefox用detail反映滚动方向，而且方向和其他浏览器相反。其他浏览器用wheelDelta
    //         let direction = event.wheelDelta || -event.detail;
    //         //保证滚动到头的时候不再调用update函数
    //         if (scrollLeft <= 0 && direction > 0) {
    //             return;
    //         }
    //         if (scrollLeft >= scrollThingWidth && direction < 0) {
    //             return;
    //         }
    //         //根据鼠标滚动的方向确定是往左还是往右移动
    //         let distance = direction > 0 ? -stepSize : stepSize;
    //         update(distance);
    //     }
    //
    //     //滚动
    //     function update(distance) {
    //         scrollLeft += distance;
    //         scrollThing.scrollLeft = scrollLeft;
    //         body.scrollLeft = scrollLeft; //针对webkit浏览器
    //     }
    // }
    //
    // scrollThing = document.getElementById('timeLine-year');  //存放需要滚动的div
    // scrollMethod(scrollThing);

    function timeClick(begin_time, end_time, begin_index, end_index, li_list) {
      begin_time = begin_time.replace(/[^0-9]/gi, "");
      end_time = end_time.replace(/[^0-9]/gi, "");
      beginTime = begin_time.toString() + "|";
      endTime = end_time.toString();

      $(li_list.children).removeClass("active");
      $(li_list.children).removeClass("active_serious");
      for (let i = begin_index; i <= end_index; i++) {
        $(li_list.children[i]).addClass("active");
      }
      $(li_list.children[begin_index]).addClass("active_serious");
      $(li_list.children[end_index]).addClass("active_serious");
      currentYear = begin_time.substr(0, 4);
      $("#yearNum").text(currentYear);
      if (begin_time.length > 4) {
        currentMonth = begin_time.substr(4, 2);
        $("#monthNum").text(+currentMonth);
        if (begin_time.length > 6) {
          currentDay = begin_time.substr(6, 2);
          $("#dayNum").text(+currentDay);
        }
      }

      _this.changeTime(beginTime + endTime); //把开始时间和终止时间传回去

      // _this.changeTime(beginTime+endTime);
      /*  for (let key in chartObj) {
             chartObj[key]({beginTime: begin_time, endTime: end_time, address: address});
             }
             taiyuanMap({beginTime: begin_time, endTime: end_time, address: address});
             singleAreaMap({beginTime: begin_time, endTime: end_time, address: address});*/
    }

    /*
         * 页面最底下时间轴的生成与功能
         * */
    jQuery.fn.selectToUISlider = function(settings) {
      // let selects = jQuery(this);

      //accessible slider options
      let options = jQuery.extend(
        {
          labels: 1, //number of visible labels
          tooltip: true, //show tooltips, boolean
          tooltipSrc: "text", //accepts 'value' as well
          labelSrc: "value", //accepts 'value' as well	,
          unitWidth: 5,
          data: [],
          selector: [],
          sliderOptions: null
        },
        settings
      );

      //handle ID attrs - selects each need IDs for handles to find them
      let handleIds = ["begin-time", "end-time"];
      let selectOptions = options.data;

      //return tooltip text from option index
      function ttText(optIndex) {
        return options.tooltipSrc === "text"
          ? selectOptions[optIndex].text
          : selectOptions[optIndex].value;
      }

      let now_values = [options.selector[0], options.selector[1] - 1]; //存放value值的数组
      let value_flag = 0;
      let subtract = 0;
      //plugin-generated slider options (can be overridden)
      let sliderOptions = {
        // animate:true,
        // disabled:true,
        step: 1,
        min: 0,
        orientation: "horizontal",
        max: selectOptions.length,
        range: true, //selects.length > 1,//multiple select elements = true
        /*时间轴的点击触发事件*/
        slide: function(e, ui) {
          //slide function
          let thisHandle = jQuery(ui.handle);
          // console.log(ui);
          // console.log(e);
          //handle feedback
          let textval = ttText(ui.value - ui.handleIndex);
          // if(e.handleObj.type == "mousedown" && e.toElement.className != 'ui-slider-range ui-corner-all ui-widget-header'){
          if (e.handleObj.type == "mousedown") {
            thisHandle.parents(".ui-slider:eq(0)").slider({
              values: [ui.value - ui.handleIndex, ui.value - ui.handleIndex + 1]
            });
            now_values = [ui.value - ui.handleIndex, ui.value - ui.handleIndex];
            // console.log('mousedown')
          } /*else if(e.handleObj.type == "mousedown"){
                     // thisHandle.parents('.ui-slider:eq(0)').slider({ values: now_values});
                     // console.log(e);
                     // console.log(ui.handle.value);
                     console.log('mousedown-only');
                     value_flag = ui.value-ui.handleIndex-now_values[0];
                     subtract = now_values[1]-now_values[0]


                     }else if(e.handleObj.type == "mousemove" && !e.toElement.className.indexOf("ui-slider")){
                     // thisHandle.parents('.ui-slider:eq(0)').slider("values", 1, ui.value+(now_values[1]-now_values[0]));
                     console.log('mousemove-only');
                     thisHandle.parents('.ui-slider:eq(0)').slider({ values: [ui.value-ui.handleIndex-value_flag, ui.value-ui.handleIndex-value_flag+subtract]});

                     now_values =[ui.value-ui.handleIndex-value_flag, ui.value-ui.handleIndex-value_flag + subtract];
                     }*/ else {
            // console.log('mousemove');
            now_values[ui.handleIndex] = ui.value - ui.handleIndex;
            // console.log(e.toElement.className);

            // thisHandle.parents('.ui-slider:eq(0)').slider("values", 1, ui.value-ui.handleIndex+2);
            /*thisHandle
                         .attr('aria-valuetext', textval)
                         .attr('aria-valuenow', ui.value-ui.handleIndex)
                         .find('.ui-slider-tooltip .ttContent')
                         .text( textval );*/
          }
          let li_list = thisHandle.closest(".ui-slider")[0].children[2];
          // li_list = $('.ui-slider');
          // li_list = parent_div.children('ol.ui-slider-scale ui-helper-reset');
          // console.log(selectOptions[now_values[0]]);
          //console.log(selectOptions[now_values[1]]);
          //console.log(selectOptions[now_values[0]].text+selectOptions[now_values[1]].text)
          timeClick(
            selectOptions[now_values[0]].text,
            selectOptions[now_values[1]].text,
            now_values[0],
            now_values[1],
            li_list
          );
          //control original select menu
          // let currSelect = jQuery('#' + thisHandle.attr('id').split('handle_')[1]);
          // currSelect.find('option').eq(ui.value-1).attr('selected', 'selected');
          // console.log(thisHandle.context.textContent);
        },

        values: options.selector
      };

      //slider options from settings
      options.sliderOptions = settings
        ? jQuery.extend(sliderOptions, settings.sliderOptions)
        : sliderOptions;

      //create slider component div
      let sliderComponent = jQuery("<div></div>");

      //CREATE HANDLES
      // selects.each(function(i){
      for (let i = 0; i < 2; i++) {
        let hidett = "";

        //associate label for ARIA
        let thisLabel = jQuery("label[for=" + jQuery(this).attr("id") + "]");
        //labelled by aria doesn't seem to work on slider handle. Using title attr as backup
        // let labelText = (thisLabel.size() > 0) ? 'Slider control for ' + thisLabel.text() + '' : '';
        let labelText = "Slider control for " + thisLabel.text() + "";
        let thisLabelId =
          thisLabel.attr("id") ||
          thisLabel.attr("id", "label_" + handleIds[i]).attr("id");

        let aria_valuetext =
          i == 0
            ? ttText(options.sliderOptions.values[i])
            : ttText(options.sliderOptions.values[i] - 1);
        if (options.tooltip == false) {
          hidett = ' style="display: none;"';
        }
        jQuery(
          "<a " +
          ' tabindex="0" ' +
          'id="' +
          handleIds[i] +
          '" ' +
          'class="ui-slider-handle" ' +
          'role="slider" ' +
          'aria-labelledby="' +
          thisLabelId +
          '" ' +
          'aria-valuemin="' +
          options.sliderOptions.min +
          '" ' +
          'aria-valuemax="' +
          options.sliderOptions.max +
          '" ' +
          'aria-valuenow="' +
          options.sliderOptions.values[i] +
          '" ' +
          'aria-valuetext="' +
          aria_valuetext +
          '" ' +
          "><img src=" +
          SliderImage +
          ' height="100%" /><span class="screenReaderContext">' +
          labelText +
          "</span>" /**/ +
            // '<span class="ui-slider-tooltip ui-widget-content ui-corner-all"' + hidett + '><span class="ttContent"></span>' +
            // '<span class="ui-tooltip-pointer-down ui-widget-content"><span class="ui-tooltip-pointer-down-inner"></span></span>' +
            "</span></a>"
        )
          .data("handleNum", i)
          .appendTo(sliderComponent);
      }

      //CREATE SCALE AND TICS
      let scale = sliderComponent
        .append(
          '<ol class="ui-slider-scale ui-helper-reset" role="presentation"></ol>'
        )
        .find(".ui-slider-scale:eq(0)");
      jQuery(selectOptions).each(function(i) {
        let style =
          i == selectOptions.length - 1 || i == 0
            ? 'style="display: none;"'
            : "";
        let labelText = options.labelSrc == "text" ? this.text : this.value;
        scale.append(
          '<li title="' +
            this.text +
            '" style="left:' +
            leftVal(i) +
            "%;width:" +
            (leftVal(i) - leftVal(i - 1)) +
            '%"><div><span class="ui-slider-label">' +
            labelText +
            '</span><div class="time_scale"></div></div></li>'
        );
      });

      function leftVal(i) {
        return (i / selectOptions.length * 100).toFixed(2);
      }

      //show the last one if there are more than 1 specified
      if (options.labels > 1)
        sliderComponent
          .find(
            ".ui-slider-scale li:last span.ui-slider-label, .ui-slider-scale dd:last span.ui-slider-label"
          )
          .addClass("ui-slider-label-show");

      //set increment
      let increm = Math.max(
        1,
        Math.round(selectOptions.length / options.labels)
      );
      //show em based on inc
      for (let j = 0; j < selectOptions.length; j += increm) {
        if (selectOptions.length - j > increm) {
          //don't show if it's too close to the end label
          sliderComponent
            .find(
              ".ui-slider-scale li:eq(" +
                j +
                ") span.ui-slider-label, .ui-slider-scale dd:eq(" +
                j +
                ") span.ui-slider-label"
            )
            .addClass("ui-slider-label-show");
        }
      }

      //inject and return
      sliderComponent
        .appendTo(jQuery(this).eq(this.length - 1))
        .slider(options.sliderOptions)
        .attr("role", "application")
        .css("width", selectOptions.length * options.unitWidth + "rem");
      //update tooltip arrow inner color
      sliderComponent.find(".ui-tooltip-pointer-down-inner").each(function() {
        let bWidth = jQuery(".ui-tooltip-pointer-down-inner").css(
          "borderTopWidth"
        );
        let bColor = jQuery(this)
          .parents(".ui-slider-tooltip")
          .css("backgroundColor");
        jQuery(this).css("border-top", bWidth + " solid " + bColor);
      });

      let values = sliderComponent.slider("values");

      return this;
    };

    $(function() {
      $("#timeLine-year").selectToUISlider({
        labels: 1,
        unitWidth: 5.5,
        /*  data: new yearInit(2000, currentYear),
                selector: [currentYear - 2000, currentYear - 2000 + 1]*/
        data: new yearInit(currentYear - 17, currentYear),
        selector: [17, 18]
      });
      $(".ui-slider ol li:last").addClass("active active_serious");
    });
  }

  render() {
    return (
      <div className="footer">
        <div className="footer-left">
          <div className="footer-ymd">
            <div className="year active" id="year">
              <span id="yearNum" />
              <span>年</span>
            </div>
            <div className="month" id="month">
              <span id="monthNum" />
              <span>月</span>
            </div>
            <div className="day" id="day">
              <span id="dayNum" />
              <span>日</span>
            </div>
          </div>
        </div>
        <div className="footer-timeLine">
          <div className="time-line" id="timeLine-year">
            <div id="timeSelectorYear" />
          </div>
          <div className="time-line displayNone" id="timeLine-month">
            <div id="timeSelectorMonth" />
          </div>
          <div className="time-line displayNone" id="timeLine-day">
            <div id="timeSelectorDay" />
          </div>
        </div>
      </div>
    );
  }
}
