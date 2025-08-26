import { FormProvider, useForm } from 'react-hook-form';
import SelectField from './Input/SelectField';
import ImageUpload from './ImageUpload';
import InputField from './Input/InputField';
import Checkbox from './Checkbox';
import Button from './Button';
import { useRouter } from 'next/router';
import { API_URL } from './Utils/api';
import { useMutation } from '@tanstack/react-query';
import ErrorMsg from './ErrorMsg';

const PostFeed = ({ socialCircles, token }) => {
  const methods = useForm();
  const router = useRouter();

  const termsAndConditions = methods.watch('terms_condition');

  const post = async (data) => {
    const formData = new FormData();
    formData.append('content', data.content || '');
    formData.append('social_circle_id', data.social_circle_id || '');

    // ✅ Ensure media is a File (not string)
    if (data.media && data.media instanceof File) {
      formData.append('media[0]', data.media); // backend accepts `media`
    }

    console.log('sending formData:', [...formData.entries()]);

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: post,
    onSuccess: () => {
      router.push('/connecting');
    },
    onError: (err) => {
      console.error('Posting failed:', err.message);
    },
  });

  const onSubmit = (data) => {
    const { terms_condition, ...payload } = data;
    mutate(payload);
  };

  return (
    <div className="md:px-20 w-full mb-20">
      <h3 className="font-medium text-[24px] leading-6 text-[#5C5C5C]">
        Tagged Connections
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-10">
          <SelectField label="Social Circle" name="social_circle_id">
            <option value="">Select social circle</option>
            {socialCircles?.map((socialCircle) => (
              <option key={socialCircle.id} value={socialCircle.id}>
                {socialCircle.name}
              </option>
            ))}
          </SelectField>

          <div className="my-10">
            {/* Make sure ImageUpload returns a File */}
            <ImageUpload name="media" />
          </div>

          <InputField
            label="Message"
            type="text"
            name="content"
            placeHolder="Enter your message"
          />

          <div className="flex items-center gap-3">
            <Checkbox name="terms_condition" id="terms" />
            <p className="font-normal text-[14px] text-[#5C5C5C]">
              By continuing, you acknowledge you have agreed to the{' '}
              <span className="text-[#A20030] cursor-pointer">
                Terms and Conditions
              </span>
            </p>
          </div>

          <Button
            label="Post"
            type="submit"
            btnclass="w-[252px] mt-10 h-14"
            isLoading={isPending}
            disabled={!termsAndConditions}
          />
        </form>
      </FormProvider>
      <ErrorMsg errorMessage={error?.message} />
    </div>
  );
};

export default PostFeed;
