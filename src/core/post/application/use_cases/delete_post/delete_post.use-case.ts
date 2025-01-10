import { IUseCase } from "../../../../shared/application/use_case.interface.js";
import { NotFoundError } from "../../../../shared/domain/errors/not_found.error.js";
import { Post } from "../../../domain/post.js";
import { PostRepository } from "../../../domain/post.repository.js";

export class DeletePostUseCase
  implements IUseCase<DeletePostInput, DeletePostOutput>
{
  constructor(private postRepo: PostRepository) {}

  async execute(input: DeletePostInput): Promise<DeletePostOutput> {
    const post = await this.postRepo.findById(input.id)

    if (!post) {
      throw new NotFoundError(input.id, Post)
    }
    
    await this.postRepo.delete(input.id);
  }
}

export type DeletePostInput = {
  id: string;
};

export type DeletePostOutput = void;
