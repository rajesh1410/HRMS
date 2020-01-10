angular
    .module('hrmsApp')
    .controller('calendarCtrl_holidays', [
        '$scope',
        'uiCalendarConfig',
        'utils',
        '$http',
        '$toast',
        'holidayData',
        '$rootScope',
        '$state',
        function ($scope,uiCalendarConfig,utils,$http,$toast,holidayData,$rootScope,$state) {

// Reset PoP-Data

            $scope.reset=function(){
                $scope.newTask={};
                $.each($('#new_task').find('.md-input-wrapper'), function (idex, val) {
                    $(val).removeClass('md-input-filled')
                });
            }


// Get Data(Holidays Data)

        $scope.getData=function(){
            // $(".http_preloader").show(); 
            $http({
                method:'get',
                url:$rootScope.$siteUrl+'Holidays',
            }).then(function(response){
                $scope.Datas=response.data
                // $(".http_preloader").hide(); 
            });
        }
        $scope.getData();


// Save and Update Data(Holidays Assign)
        
        $scope.save=function(postdata){

            // console.log(postdata);
            var to_d = postdata.Date.split('-');
            var TD= to_d[2]+"-"+to_d[1]+"-"+to_d[0];
            postdata.Date = TD;

$(".http_preloader").show(); 
           if(postdata.id==null){ 

            $http({
                method:'post',
                url:$rootScope.$siteUrl+'Holidays',
                data:postdata
            }).then(function(response){
                console.log(response,'Holidayssave')
                $toast('Holidays Assign Successfully','success');
                $scope.newTask={};
                UIkit.modal("#new_task").hide();
                $scope.getData();
                $(".http_preloader").hide(); 
            });
            
            }else{
                $http({
                    method:'post',
                    url:$rootScope.$siteUrl+'HolidaysUpdate/'+postdata.id,
                    data:postdata
                }).then(function(response){
                    console.log(response,"HolidaysUpdate");
                    $scope.newTask={};
                    UIkit.modal("#new_task").hide();  
                    $scope.getData();
                    $(".http_preloader").hide(); 
                    $toast('Holidays Update Successfully','success');
                });
            }

        };

//Edit Data(Holidays)

$scope.edit=function(editdata){
    console.log(editdata)
    $http({
        method:'get',
        url:$rootScope.$siteUrl+'HolidaysEdit/'+ editdata.id,
    }).then(function(response){
        $scope.newTask=response.data
        console.log(response,"Holidays Edit")
    })
};


// Delete Data(Holidays)

        $scope.DeleteHolidays=function(destorydata){
            UIkit.modal.confirm('Are you sure?', function(){
            console.log(destorydata,"destorydataHolidays")
            $http({
                method:'Delete',
                url:$rootScope.$siteUrl+'HolidaysDelete/'+destorydata.id,
                data:destorydata
            }).then(function(response){
                console.log(response,"Holidaysdestorydata")
                $scope.getData();
                $toast('Holidays Delete Successfully','success');
            })
        });
        
        };

// Event Added (Calendar) 

           $scope.randID_generator = function() {
                var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                return randLetter + Date.now();
            };

//Color picker(Event) 

            $scope.color_picker = function(object,pallete) {
                if(object) {
                    var cp_id = $scope.randID_generator(),
                        cp_pallete = pallete ? pallete : ['#e53935','#d81b60','#8e24aa','#5e35b1','#3949ab','#1e88e5','#039be5','#0097a7','#00897b','#43a047','#689f38','#ef6c00','#f4511e','#6d4c41','#757575','#546e7a'],
                        cp_pallete_length = cp_pallete.length,
                        cp_wrapper = $('<div class="cp_altair" id="'+cp_id+'"/>');

                    for(var $i=0;$i<cp_pallete_length;$i++) {
                        cp_wrapper.append('<span data-color=' + cp_pallete[$i] + ' style="background:' + cp_pallete[$i] + '"></span>');
                    }

                    cp_wrapper.append('<input type="hidden">');

                    $('body').on('click', '#'+cp_id+' span',function() {
                        $(this)
                            .addClass('active_color')
                            .siblings().removeClass('active_color')
                            .end()
                            .closest('.cp_altair').find('input').val($(this).attr('data-color'));
                    });
                    return object.append(cp_wrapper);

                }
            };

            $scope.calendarColorPicker = $scope.color_picker($('<div id="calendar_colors_wrapper"></div>')).prop('outerHTML');

// UI-Config(Event-Update)

            $scope.uiConfig = {
                calendar: {
                    eventClick: function (postdata) {
                        // $scope.EventEdit(postdata);
                        console.log(postdata,"newevent"); 
                        UIkit.modal.prompt('' +
                        '<h3 class="heading_b uk-margin-medium-bottom">New Event</h3><div class="uk-margin-medium-bottom" id="calendar_colors">' +
                        'Event Color:' +
                        $scope.calendarColorPicker+
                        '</div>' +
                        'Event Title:',
                        postdata.title,function(newvalue){
                            console.log(newvalue,"postdatapostasatata")
                            var eventData,
                                        eventColor = $('#calendar_colors_wrapper').find('input').val();
                                    eventData = {
                                        title: newvalue,
                                        start: postdata.start,
                                        end: postdata.end,
                                        color: eventColor ? eventColor : ''
                                    };
                            $http({
                                method:'post',
                                url:$rootScope.$siteUrl+'UpdateEvent/'+postdata.id,
                                data:eventData
                            }).then(function(response){
                                $toast('Event Update Successfully','success');
                                $state.reload();
                                console.log(response,'eventclickpostdata')
                            })
                         },{
                            labels: {
                                Ok: 'Update Event'
                            }
                        });                        
                    },                 
                    header: {
                        left: 'title today',
                        center: '',
                        right: 'month,agendaWeek,agendaDay,listWeek prev,next'
                    },
                    buttonIcons: {
                        prev: 'md-left-single-arrow',
                        next: 'md-right-single-arrow',
                        prevYear: 'md-left-double-arrow',
                        nextYear: 'md-right-double-arrow'
                    },
                    buttonText: {
                        today: ' ',
                        month: ' ',
                        week: ' ',
                        day: ' '
                    },
                    aspectRatio: 2.1,
                    defaultDate: moment(),
                    selectable: true,
                    selectHelper: true,

// New Event Added(Event)
                    
                        select: function (start, end) {
                        UIkit.modal.prompt('' +
                            '<h3 class="heading_b uk-margin-medium-bottom">New Event</h3><div class="uk-margin-medium-bottom" id="calendar_colors">' +
                            'Event Color:' +
                            $scope.calendarColorPicker +
                            '</div>' +
                            'Event Title:',
                            '', function (newvalue) {
                                if ($.trim(newvalue) !== '') {
                                    var eventData,
                                        eventColor = $('#calendar_colors_wrapper').find('input').val();
                                    eventData = {
                                        title: newvalue,
                                        start: start,
                                        end: end,
                                        color: eventColor ? eventColor : ''
                                    };
                                    $scope.save=function(){
                                        $http({
                                            method:'post',
                                            url:$rootScope.$siteUrl +'CalHolidays',
                                            data:eventData
                                        }).then(function(response){
                                            $toast('Event Added Successfully','success');
                                             $state.reload();
                                            console.log(response,'responseresponseresponse')
                                        })
                                    }
                                    $scope.save();
                                    // uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                                    // uiCalendarConfig.calendars.myCalendar.fullCalendar('unselect');
                                }
                            }, {
                                labels: {
                                    Ok: 'Add Event'
                                }
                            });
                    },
                    editable: true,
                    eventLimit: true,
                    timeFormat: '(HH)(:mm)'
                }

            };
//Event Data  
            $scope.calendar_events = holidayData;
            $scope.eventSources = [$scope.calendar_events];
            console.log($scope.eventSources,'$scope.eventSources');

// Delete Data ascending odered

                $scope.Delete=function(){
                    $http({
                        method:'delete',
                        url:$rootScope.$siteUrl+'check',
                    }).then(function(response){
                        console.log(response,'DeleteDataCalender');
                        holidayData=response.data
                    })
                }
                $scope.Delete();

//Date
            var $dp_start = $('#uk_dp_start'),
                $dp_end = $('#uk_dp_end');

            var start_date = UIkit.datepicker($dp_start, { 
                format:'YYYY.MM.DD'
            });

            var end_date = UIkit.datepicker($dp_end, {
                format:'YYYY.MM.DD'
            });

            $dp_start.on('change',function() {
                end_date.options.minDate = $dp_start.val();
            });

            $dp_end.on('change',function() {
                start_date.options.maxDate = $dp_end.val();
            });
        }
    ]);


