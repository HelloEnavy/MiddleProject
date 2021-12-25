var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.49940921486961, 127.02904695751812),
    level: 3

};



var map = new kakao.maps.Map(container, options); //지도 생성
var positions = [{
        content: '<div style="background-color:azure; width=10px;">비트캠프</div>',
        latlng: new kakao.maps.LatLng(37.49940921486961, 127.02904695751812),
        linkC: '<div class="overlaybox"><div class="boxtitle">비트캠프<div class="close" onclick="closeOverlay()" title="닫기"></div></div><div class="first">' +
            '<div class="text"><a href="https://map.kakao.com/link/to/비트캠프,37.49940921486961, 127.02904695751812" style="color:#00F5FF" target="_blank">길찾기</a></div></div></div>'
    },
    {
        content: '<div style="background-color:azure; width=10px;">미진식당</div>',
        latlng: new kakao.maps.LatLng(37.49780488002854, 127.0285311430128),
        linkC: '<div class="overlaybox"> <div class="boxtitle">미진식당<div class="close" onclick="closeOverlay()" title="닫기"></div></div><div class="first">' +
            '<div class="text"><a href="https://map.kakao.com/link/to/미진식당,37.49780488002854, 127.0285311430128" style="color:#00F5FF" target="_blank">길찾기</a></div></div></div>'
    },
    {
        content: '<div style="background-color:azure; width=10px;">곱스떡스</div>',
        latlng: new kakao.maps.LatLng(37.5022283913203, 127.02729429671771),
        linkC: '<div class="overlaybox"><div class="boxtitle">곱스떡스<div class="close" onclick="closeOverlay()" title="닫기"></div></div><div class="first">' +
            '<div class="text"><a href="https://map.kakao.com/link/to/곱스떡스,37.5022283913203, 127.02729429671771" style="color:#00F5FF" target="_blank">길찾기</a></div></div></div>'
    },
    {
        content: '<div style="background-color:azure; width=10px;">정육도</div>',
        latlng: new kakao.maps.LatLng(37.50051601165904, 127.0282434729202),
        linkC: '<div class="overlaybox"><div class="boxtitle">정육도<div class="close" onclick="closeOverlay()" title="닫기"></div></div><div class="first">' +
            '<div class="text"><a href="https://map.kakao.com/link/to/정육도,37.50051601165904, 127.0282434729202" style="color:#00F5FF" target="_blank">길찾기</a></div></div></div>'
    },
    {
        content: '<div style="background-color:azure; width=10px;">세컨드컵커피</div>',
        latlng: new kakao.maps.LatLng(37.4999117373091, 127.02877027873477),
        linkC: '<div class="overlaybox" ><div class="boxtitle">세컨드컵커피<div class="close" onclick="closeOverlay()" title="닫기"></div></div><div class="first">' +
            '<div class="text"><a href="https://map.kakao.com/link/to/세컨드컵커피,37.4999117373091, 127.02877027873477" style="color:#00F5FF" target="_blank">길찾기</a></div></div></div>'
    }
];

for (var i = 0; i < positions.length; i++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng // 마커의 위치
    });

    // 마커에 시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    kakao.maps.event.addListener(marker, 'click', mouseTest(i, marker, infowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    }
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}



var customOverlay;

function mouseTest(index, marker, infowindow) {
    return function() {
        let position = marker.getPosition();
        let positionTest = new kakao.maps.LatLng(position['Ma'], position['La']);

        // 커스텀 오버레이를 생성합니다
        customOverlay = new kakao.maps.CustomOverlay({
            position: positionTest,
            content: positions[index].linkC,
            xAnchor: 0.3,
            yAnchor: 0.91

        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
    }
}

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
function closeOverlay() {
    customOverlay.setMap(null);
}

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);