import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { ExceptionLoggerFilter } from 'src/utils/exceptionsLogger.filter';
import FindOneParams from 'src/utils/findOneParams';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  @UseFilters(ExceptionLoggerFilter)
  getPostById(@Param() { id }: FindOneParams) {
    return this.postService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.createPost(post, req.user);
  }

  @Put(':id')
  async replacePost(
    @Param('id') id: FindOneParams,
    @Body() post: UpdatePostDto,
  ) {
    return this.postService.replacePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: FindOneParams) {
    return this.postService.deletePost(Number(id));
  }
}
