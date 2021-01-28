import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import Sample from './sample.entity';

@Service()
@EntityRepository(Sample)
export class SampleRepository extends Repository<Sample> {}
