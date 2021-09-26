// red wire		= 3v3
// black wire	= ground
// orange wire	= sclk
// yellow wire	= mosi
// green wire	= miso
// brown wire	= cs
#define WIN32_LEAN_AND_MEAN

#include <winsock2.h>
#include <ws2tcpip.h>
#include <stdio.h>

// Need to link with Ws2_32.lib
#pragma comment(lib, "ws2_32.lib")

#include <stdio.h>
#include <Windows.h>
#include <time.h>
#include <conio.h>
#include <cstring>
#include "libMPSSE_spi.h"
#include <iostream>
#include <fstream>

void print_and_quit(const char cstring[]) {
	printf("%s\n", cstring);
	//getc(stdin);
	exit(1);
}

int main(int argc, char** argv) {

	WORD wVersionRequested;
	WSADATA wsaData;
	int err;

	/* Use the MAKEWORD(lowbyte, highbyte) macro declared in Windef.h */
	wVersionRequested = MAKEWORD(2, 2);

	err = WSAStartup(wVersionRequested, &wsaData);
	if (err != 0) {
		/* Tell the user that we could not find a usable */
		/* Winsock DLL.                                  */
		printf("WSAStartup failed with error: %d\n", err);
		return 1;
	}

	/* Confirm that the WinSock DLL supports 2.2.*/
	/* Note that if the DLL supports versions greater    */
	/* than 2.2 in addition to 2.2, it will still return */
	/* 2.2 in wVersion since that is the version we      */
	/* requested.                                        */

	if (LOBYTE(wsaData.wVersion) != 2 || HIBYTE(wsaData.wVersion) != 2) {
		/* Tell the user that we could not find a usable */
		/* WinSock DLL.                                  */
		printf("Could not find a usable version of Winsock.dll\n");
		WSACleanup();
		return 1;
	}
	else
		printf("The Winsock 2.2 dll was found okay\n");


	/* The Winsock DLL is acceptable. Proceed to use it. */

	/* Add network programming using Winsock here */

	/* then call WSACleanup when done using the Winsock dll */


	Init_libMPSSE();

	FT_STATUS status;
	FT_DEVICE_LIST_INFO_NODE channelInfo;
	FT_HANDLE handle;
	clock_t start, end;
	/*int speed = 0;*/
	/*int result_volt;*/

	// check how many MPSSE channels are available
	uint32 channelCount = 0;
	status = SPI_GetNumChannels(&channelCount);
	if (status != FT_OK)
		print_and_quit("Error while checking the number of available MPSSE channels.");
	else if (channelCount < 1)
		print_and_quit("Error: no MPSSE channels are available.");

	printf("There are %d channels available.\n\n", channelCount);

	// print out details for each MPSSE channel
	for (uint32 i = 0; i < channelCount; i++) {
		status = SPI_GetChannelInfo(i, &channelInfo);
		if (status != FT_OK)
			print_and_quit("Error while getting details for an MPSSE channel.");

		printf("Channel number: %d\n", i);
		printf("Description: %s\n", channelInfo.Description);
		printf("Serial Number: %s\n\n", channelInfo.SerialNumber);
	}

	// ask the user to select a channel
	uint32 channel = 0;
	printf("\nchoose channel 1 \n\n");
	channel = 1;

	// open the MPSSE channel (get the handle for it)
	status = SPI_OpenChannel(channel, &handle);
	if (status != FT_OK)
		print_and_quit("Error while opening the MPSSE channel.");

	// init the channel (configure it)
	 
	/*printf("---------------소개--------------\n\n");
	printf("micro bus 의 an/bc0 로 들어오는 아날로그 전기 신호를 디지털로 바꿔줍니다.\n\n");
	printf("출력 범위는 0~4096이고 총 12비트 디지털 출력입니다.\n\n");
	printf("an/bc0 입력 전압은 0볼트~3볼트 범위측정가능합니다.\n\n");
	printf("시작하기 전에 vin쪽으로 노란색 소켓 연결 ㄱㄱ\n\n");
	printf("---------------------------------\n\n");
	printf("지연시간조정( 0~255 정수)(0입력시 가장 빠름):::");
	scanf_s("%d", &speed);
	if ((speed > 255) & (speed < 0))
	{
		printf("다시입력 !");
		printf("지연시간조정( 0~255 정수)(0입력시 가장 빠름):::");
		scanf_s("%d", &speed);
	};*/
	
	ChannelConfig channelConfig;
	channelConfig.ClockRate = 1000000; // 1 MHz
	channelConfig.configOptions = SPI_CONFIG_OPTION_MODE0 | SPI_CONFIG_OPTION_CS_DBUS4 | SPI_CONFIG_OPTION_CS_ACTIVELOW;
	channelConfig.LatencyTimer = 20/*(uint8)speed*/;
	status = SPI_InitChannel(handle, &channelConfig);
	if (status != FT_OK)
		print_and_quit("Error while initializing the MPSSE channel.");

	// configure the gyro
	uint8 tx_buffer[3] = {
		0b00000110,
		0b00000000,					// value for register 0x20
		0b00000000					// value for register 0x21
								// value for register 0x24
	};
	uint32 transferCount = 0;
	uint32 options = SPI_TRANSFER_OPTIONS_SIZE_IN_BITS | SPI_TRANSFER_OPTIONS_CHIPSELECT_ENABLE | SPI_TRANSFER_OPTIONS_CHIPSELECT_DISABLE;
	status = SPI_Write(handle, tx_buffer, 24, &transferCount, options);
	if (status != FT_OK)
		print_and_quit("Error while configuring the gyro.\n");


	start = clock(); //시간 측정 시작

	printf("\n");

	while (1) {
		uint8 rx_buffer[3] = { 0, };
		transferCount = 0;
		
		uint32 options = SPI_TRANSFER_OPTIONS_SIZE_IN_BITS | SPI_TRANSFER_OPTIONS_CHIPSELECT_ENABLE | SPI_TRANSFER_OPTIONS_CHIPSELECT_DISABLE;
		status = SPI_ReadWrite(handle, rx_buffer, tx_buffer, 24, &transferCount, options);
		if (status != FT_OK)
			print_and_quit("reading error ");
		/*
		printf("전송비트: ");
		bin_print(tx_buffer[0]);
		bin_print(tx_buffer[1]);
		bin_print(tx_buffer[2]);
		printf("\n");
		printf("수신비트: ");
		printf("%d  ",rx_buffer[0]);
		printf("%d  ",rx_buffer[1]);
		printf("%d  ",rx_buffer[2]);
		*/

		end = clock(); //시간 측정 끝
		
		rx_buffer[1] = (rx_buffer[1] & 0b00011111);
		
		printf("time(ms): %d\t", end - start);
		printf("\tvolt: %d    \t", 256 * rx_buffer[1] + rx_buffer[2]);
	
		// 파일 쓰기 준비
		std::ofstream dataFile("C:/optical_fiber/src/main/resources/static/sample_data/data.txt", std::ios::trunc);

		if (dataFile.is_open()) {
			dataFile << 256 * rx_buffer[1] + rx_buffer[2] << "\n";
			dataFile.close();
		}

		if (_kbhit())break;
		printf("\n\n");
	}
	WSACleanup();

	Cleanup_libMPSSE();
	return 0;
}

