import Tutorial from './tutorial';

export default interface ITutorialRepository {
  get(id: string): Promise<Tutorial>;
  list(userId: string): Promise<Tutorial[]>;
}
