import { Injectable, Logger } from "@nestjs/common";

import { UtilService } from "../util/util.service";
import { Injectable } from "@nestjs/common";

/**
 * @author Joo
 *
 * @description
 *      ffmpeg Command Line으로 영상 및 오디오 다운로드
 */

@Injectable()
export class FfmpegService {
  private readonly logger = new Logger(FfmpegService.name);

  constructor(private util: UtilService) {}

  public async downloadVideo(
    id: string,
    index: number,
    videoUrl: string
  ): Promise<string> {
    const filePath: string = this.getVideoPath(id, index);

    this.logger.log(`downloading video: ${videoUrl}\r\n  ==>> ${filePath}`);

    await this.util.execToPromise(`ffmpeg -y -i ${videoUrl} ${filePath}`);

    return filePath;
  }

  public async downloadAudio(id: string, audioUrl: string): Promise<string> {
    const filePath: string = this.getAudioPath(id);
    this.logger.log(
      `downloading audio:\r\n  ==>> ${audioUrl} into ${filePath}`
    );
    await this.util.execToPromise(`ffmpeg -y -i "${audioUrl}" ${filePath}`);

    return filePath;
  }
}
