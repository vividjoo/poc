import { Module } from "@nestjs/common";
import { UtilModule } from "../util/util.module";
import { FfmpegService } from "./ffmpeg.service";

/**
 * @author Joo
 * @description
 *    child_process exec를 이용해 ffmpeg명령어로 영상을 다운, 편집을 담당하는 ffmpeg.service의 모듈.
 *    util.service를 사용하기 위해 UtilModule을 import.
 *    외부에서 ffmpeg 모듈을 import해 ffmpeg.service를 사용할 것이기에 ffmpeg.service를 exports해 주어야 한다.
 *
 */
@Module({
  imports: [UtilModule],
  providers: [FfmpegService],
  exports: [FfmpegService],
})
export class FfmpegModule {}
