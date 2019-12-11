import ITutorialRepository from '../domain/models/tutorial/repository';
import Tutorial from "../domain/models/tutorial/tutorial";

export class AddTutorialPathPriorityUseCase {
  private _tutorialRepository: ITutorialRepository;

  constructor(tutorialRepository: ITutorialRepository) {
    this._tutorialRepository = tutorialRepository
  }

  public async run(userId: string): Promise<void> {
    const user = new Tutorial();
    await this._tutorialRepository.store(user);
  }
}
