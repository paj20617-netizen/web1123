@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ========================================================
echo  당기면 쏙! 움직이는 인터랙티브 입체도형 공작소
echo  로컬 웹 서버를 실행합니다...
echo ========================================================
echo.
echo 브라우저에서 자동으로 페이지를 엽니다: http://localhost:8000
start http://localhost:8000
echo.
echo 서버를 종료하려면 이 창에서 Ctrl+C 를 누르세요.
echo.
python -m http.server 8000
pause
